# blog/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from datetime import datetime

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get room name from URL
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # Send welcome message
        await self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': f'You are now connected to {self.room_name}'
        }))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        username = data.get('username', 'Anonymous')
        
        # Get user info if authenticated
        user = self.scope.get('user')
        if user and user.is_authenticated:
            username = user.username

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'timestamp': datetime.now().isoformat(),
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'chat',
            'message': event['message'],
            'username': event['username'],
            'timestamp': event['timestamp'],
        }))


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope.get('user')
        
        if self.user and self.user.is_authenticated:
            # User-specific notification group
            self.notification_group_name = f'notifications_{self.user.id}'
            
            await self.channel_layer.group_add(
                self.notification_group_name,
                self.channel_name
            )
            
            await self.accept()
        else:
            # Reject connection if not authenticated
            await self.close()

    async def disconnect(self, close_code):
        if self.user and self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.notification_group_name,
                self.channel_name
            )

    # Receive notification from group
    async def send_notification(self, event):
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'title': event['title'],
            'message': event['message'],
            'timestamp': event.get('timestamp', datetime.now().isoformat()),
        }))