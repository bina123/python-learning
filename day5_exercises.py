# Day 5 Exercises

import json
import csv
import os
from datetime import datetime

print("=" * 60)
print("DAY 5 EXERCISES")
print("=" * 60)

# Exercise 1: Log Analyzer
print("\n--- Exercise 1: Log File Analyzer ---")
"""
Create a function that:
1. Reads a log file
2. Counts occurrences of each log level (INFO, WARNING, ERROR)
3. Returns statistics
"""

def analyze_log_file(filename):
    """Analyze log file and return statistics."""
    stats = {"INFO": 0, "WARNING": 0, "ERROR": 0, "total": 0}
    
    try:
        with open(filename, 'r') as file:
            for line in file:
                stats["total"] += 1
                
                if "[INFO]" in line:
                    stats["INFO"] += 1
                elif "[WARNING]" in line:
                    stats["WARNING"] += 1
                elif "[ERROR]" in line:
                    stats["ERROR"] += 1
        
        return stats
        
    except FileNotFoundError:
        print(f"Error: File {filename} not found")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

# Test it
result = analyze_log_file('day5_practice/app.log')
if result:
    print(f"Total entries: {result['total']}")
    print(f"INFO: {result['INFO']}")
    print(f"WARNING: {result['WARNING']}")
    print(f"ERROR: {result['ERROR']}")

# Exercise 2: CSV to JSON Converter
print("\n\n--- Exercise 2: CSV to JSON Converter ---")
"""
Create a function that converts CSV file to JSON format.
"""

def csv_to_json(csv_filename, json_filename):
    """Convert CSV file to JSON."""
    try:
        # Read CSV
        with open(csv_filename, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            data = list(csv_reader)
        
        # Write JSON
        with open(json_filename, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        
        print(f"✓ Converted {csv_filename} to {json_filename}")
        print(f"  Total records: {len(data)}")
        return True
        
    except FileNotFoundError as e:
        print(f"✗ File not found: {e}")
        return False
    except Exception as e:
        print(f"✗ Conversion failed: {e}")
        return False

# Test it
csv_to_json('day5_practice/users.csv', 'day5_practice/users.json')

# Exercise 3: Safe Configuration Loader
print("\n\n--- Exercise 3: Configuration Loader ---")
"""
Create a configuration loader that:
1. Loads config from JSON file
2. Validates required fields
3. Provides default values for missing optional fields
4. Handles errors gracefully
"""

class ConfigLoader:
    """Load and validate configuration."""
    
    REQUIRED_FIELDS = ['database', 'app']
    DEFAULTS = {
        'debug': False,
        'port': 8000,
        'host': 'localhost'
    }
    
    def __init__(self, config_file):
        self.config_file = config_file
        self.config = None
    
    def load(self):
        """Load configuration with validation."""
        try:
            # Load JSON
            with open(self.config_file, 'r') as file:
                self.config = json.load(file)
            
            # Validate required fields
            for field in self.REQUIRED_FIELDS:
                if field not in self.config:
                    raise ValueError(f"Missing required field: {field}")
            
            # Apply defaults
            for key, default_value in self.DEFAULTS.items():
                if key not in self.config.get('app', {}):
                    if 'app' not in self.config:
                        self.config['app'] = {}
                    self.config['app'][key] = default_value
            
            print("✓ Configuration loaded successfully")
            return self.config
            
        except FileNotFoundError:
            print(f"✗ Config file not found: {self.config_file}")
            return None
        except json.JSONDecodeError:
            print(f"✗ Invalid JSON in {self.config_file}")
            return None
        except ValueError as e:
            print(f"✗ Validation error: {e}")
            return None
        except Exception as e:
            print(f"✗ Unexpected error: {e}")
            return None
    
    def get(self, key, default=None):
        """Get configuration value."""
        if not self.config:
            return default
        
        # Support nested keys like 'database.host'
        keys = key.split('.')
        value = self.config
        
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        
        return value

# Test it
config_loader = ConfigLoader('day5_practice/config.json')
config = config_loader.load()

if config:
    print(f"\nDatabase host: {config_loader.get('database.host')}")
    print(f"App debug: {config_loader.get('app.debug')}")
    print(f"App port: {config_loader.get('app.port')}")

# Exercise 4: File Backup System
print("\n\n--- Exercise 4: File Backup System ---")
"""
Create a backup system that:
1. Backs up specified files
2. Adds timestamp to backup filename
3. Handles errors
"""

def backup_file(source_file, backup_dir='backups'):
    """Create backup of a file."""
    try:
        # Create backup directory if it doesn't exist
        if not os.path.exists(backup_dir):
            os.makedirs(backup_dir)
        
        # Read source file
        with open(source_file, 'r') as file:
            content = file.read()
        
        # Create backup filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_name = os.path.basename(source_file)
        name, ext = os.path.splitext(base_name)
        backup_filename = f"{name}_backup_{timestamp}{ext}"
        backup_path = os.path.join(backup_dir, backup_filename)
        
        # Write backup
        with open(backup_path, 'w') as file:
            file.write(content)
        
        print(f"✓ Backed up {source_file} to {backup_path}")
        return backup_path
        
    except FileNotFoundError:
        print(f"✗ Source file not found: {source_file}")
        return None
    except Exception as e:
        print(f"✗ Backup failed: {e}")
        return None

# Test it
backup_file('day5_practice/sample.txt', 'day5_practice/backups')
backup_file('day5_practice/config.json', 'day5_practice/backups')

print("\n" + "=" * 60)