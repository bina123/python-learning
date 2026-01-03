# Django Templates vs Laravel Blade

| Laravel Blade | Django Template | Purpose |
|---------------|-----------------|---------|
| `{{ $variable }}` | `{{ variable }}` | Output variable |
| `{!! $html !!}` | `{{ html\|safe }}` | Output unescaped HTML |
| `@if ($condition)` | `{% if condition %}` | If statement |
| `@foreach ($items as $item)` | `{% for item in items %}` | For loop |
| `@extends('layout')` | `{% extends 'layout.html' %}` | Extend layout |
| `@section('content')` | `{% block content %}` | Define section |
| `@yield('content')` | `{% block content %}{% endblock %}` | Placeholder |
| `@include('partial')` | `{% include 'partial.html' %}` | Include partial |
| `{{ $user->name }}` | `{{ user.name }}` | Access property |
| `{{ route('home') }}` | `{% url 'home' %}` | Generate URL |
| `{{ old('name') }}` | `{{ form.name.value }}` | Form old value |
| `@csrf` | `{% csrf_token %}` | CSRF token |

## Template Filters (Like Blade directives)
```django
{{ value|default:"nothing" }}        {# Laravel: $value ?? 'nothing' #}
{{ name|upper }}                     {# Laravel: strtoupper($name) #}
{{ name|lower }}                     {# Laravel: strtolower($name) #}
{{ name|title }}                     {# Laravel: Str::title($name) #}
{{ text|truncatewords:30 }}          {# Laravel: Str::words($text, 30) #}
{{ date|date:"Y-m-d" }}             {# Laravel: $date->format('Y-m-d') #}
{{ number|add:5 }}                   {# Laravel: $number + 5 #}
{{ items|length }}                   {# Laravel: count($items) #}
{{ list|join:", " }}                 {# Laravel: implode(', ', $list) #}
```

## Template Tags
```django
{# Comments - Like {{-- --}} in Blade #}

{% if user.is_authenticated %}
    Hello {{ user.username }}!
{% else %}
    Please log in.
{% endif %}

{% for post in posts %}
    {{ post.title }}
    
    {% empty %}  {# Like @forelse in Blade #}
    No posts found.
{% endfor %}

{% with total=posts.count %}
    Total: {{ total }}
{% endwith %}

{% url 'blog:post_detail' post.slug %}  {# Like route() #}

{% static 'css/style.css' %}  {# Like asset() #}
```