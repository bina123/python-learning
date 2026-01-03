# Django vs Laravel - Quick Reference

## Project Structure

| Laravel | Django | Purpose |
|---------|--------|---------|
| `php artisan` | `python manage.py` | CLI tool |
| `config/` | `settings.py` | Configuration |
| `routes/web.php` | `urls.py` | URL routing |
| `app/Http/Controllers/` | `views.py` | Request handlers |
| `app/Models/` | `models.py` | Database models |
| `resources/views/` | `templates/` | HTML templates |
| `app/Http/Middleware/` | `middleware.py` | Middleware |
| `.env` | `.env` | Environment variables |
| `database/migrations/` | `migrations/` | Database migrations |

## Commands Comparison

| Laravel | Django | Purpose |
|---------|--------|---------|
| `php artisan serve` | `python manage.py runserver` | Start dev server |
| `php artisan make:model` | (create manually) | Create model |
| `php artisan make:migration` | `python manage.py makemigrations` | Create migration |
| `php artisan migrate` | `python manage.py migrate` | Run migrations |
| `php artisan tinker` | `python manage.py shell` | Interactive shell |
| `php artisan make:controller` | (create manually) | Create controller |

## Key Concepts

### Laravel: MVC (Model-View-Controller)
- Model: Database
- View: Blade templates
- Controller: Business logic

### Django: MVT (Model-View-Template)
- Model: Database (same as Laravel)
- View: Business logic (like Laravel Controller!)
- Template: HTML (like Laravel View/Blade!)

**IMPORTANT**: Django "View" = Laravel "Controller"!