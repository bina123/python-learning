# Day 5 Project: File-based Task Manager

import json
import os
from datetime import datetime

print("=" * 60)
print("FILE-BASED TASK MANAGER")
print("=" * 60)

class TaskManager:
    """Simple task manager using JSON file storage."""
    
    def __init__(self, filename='tasks.json'):
        self.filename = filename
        self.tasks = self.load_tasks()
    
    def load_tasks(self):
        """Load tasks from JSON file."""
        try:
            if os.path.exists(self.filename):
                with open(self.filename, 'r') as file:
                    return json.load(file)
            return []
        except json.JSONDecodeError:
            print(f"Warning: {self.filename} is corrupted. Starting fresh.")
            return []
        except Exception as e:
            print(f"Error loading tasks: {e}")
            return []
    
    def save_tasks(self):
        """Save tasks to JSON file."""
        try:
            with open(self.filename, 'w') as file:
                json.dump(self.tasks, file, indent=4)
            return True
        except Exception as e:
            print(f"Error saving tasks: {e}")
            return False
    
    def add_task(self, title, description="", priority="medium"):
        """Add a new task."""
        task = {
            "id": len(self.tasks) + 1,
            "title": title,
            "description": description,
            "priority": priority,
            "completed": False,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        self.tasks.append(task)
        
        if self.save_tasks():
            print(f"✓ Added task: {title}")
            return task
        return None
    
    def list_tasks(self, show_completed=True):
        """List all tasks."""
        if not self.tasks:
            print("No tasks found!")
            return
        
        print(f"\n{'ID':<4} {'Title':<30} {'Priority':<10} {'Status':<12}")
        print("-" * 60)
        
        for task in self.tasks:
            if not show_completed and task['completed']:
                continue
            
            status = "✓ Completed" if task['completed'] else "○ Pending"
            print(f"{task['id']:<4} {task['title']:<30} {task['priority']:<10} {status:<12}")
    
    def complete_task(self, task_id):
        """Mark a task as completed."""
        for task in self.tasks:
            if task['id'] == task_id:
                task['completed'] = True
                task['completed_at'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                
                if self.save_tasks():
                    print(f"✓ Completed: {task['title']}")
                    return True
        
        print(f"✗ Task {task_id} not found")
        return False
    
    def delete_task(self, task_id):
        """Delete a task."""
        for i, task in enumerate(self.tasks):
            if task['id'] == task_id:
                deleted_task = self.tasks.pop(i)
                
                if self.save_tasks():
                    print(f"✓ Deleted: {deleted_task['title']}")
                    return True
        
        print(f"✗ Task {task_id} not found")
        return False
    
    def get_statistics(self):
        """Get task statistics."""
        total = len(self.tasks)
        completed = sum(1 for task in self.tasks if task['completed'])
        pending = total - completed
        
        if total > 0:
            completion_rate = (completed / total) * 100
        else:
            completion_rate = 0
        
        print("\n--- Task Statistics ---")
        print(f"Total tasks: {total}")
        print(f"Completed: {completed}")
        print(f"Pending: {pending}")
        print(f"Completion rate: {completion_rate:.1f}%")
    
    def export_to_csv(self, filename='tasks.csv'):
        """Export tasks to CSV file."""
        try:
            import csv
            
            with open(filename, 'w', newline='') as file:
                if not self.tasks:
                    print("No tasks to export")
                    return
                
                fieldnames = ['id', 'title', 'description', 'priority', 'completed', 'created_at']
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                
                writer.writeheader()
                for task in self.tasks:
                    row = {key: task.get(key, '') for key in fieldnames}
                    writer.writerow(row)
            
            print(f"✓ Exported to {filename}")
            return True
            
        except Exception as e:
            print(f"✗ Export failed: {e}")
            return False

# Demo usage
print("\n--- Creating Task Manager ---\n")

# Create manager instance
manager = TaskManager('day5_practice/tasks.json')

# Add some tasks
manager.add_task(
    "Learn Python basics",
    "Complete Days 1-5 of Python learning",
    "high"
)

manager.add_task(
    "Build Django project",
    "Create a blog application with Django",
    "high"
)

manager.add_task(
    "Study Machine Learning",
    "Read about ML algorithms",
    "medium"
)

manager.add_task(
    "Review React concepts",
    "Go through React hooks and state management",
    "medium"
)

manager.add_task(
    "Read documentation",
    "Study NumPy and Pandas documentation",
    "low"
)

# List all tasks
print("\n--- All Tasks ---")
manager.list_tasks()

# Complete some tasks
print("\n--- Completing Tasks ---")
manager.complete_task(1)
manager.complete_task(3)

# List tasks again
print("\n--- Updated Task List ---")
manager.list_tasks()

# Show only pending tasks
print("\n--- Pending Tasks Only ---")
manager.list_tasks(show_completed=False)

# Get statistics
manager.get_statistics()

# Export to CSV
print("\n--- Exporting ---")
manager.export_to_csv('day5_practice/tasks_export.csv')

# Delete a task
print("\n--- Deleting Task ---")
manager.delete_task(5)

# Final list
print("\n--- Final Task List ---")
manager.list_tasks()

print("\n" + "=" * 60)
print("Task Manager Demo Complete!")
print(f"Check 'day5_practice/tasks.json' to see saved tasks")
print("=" * 60)