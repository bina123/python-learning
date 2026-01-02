# Day 6 Project: Object-Oriented Banking System

from datetime import datetime
from abc import ABC, abstractmethod

print("=" * 60)
print("OBJECT-ORIENTED BANKING SYSTEM")
print("=" * 60)

# Base Account class
class Account(ABC):
    """Abstract base class for all account types."""
    
    # Class variable
    _account_counter = 1000
    
    def __init__(self, account_holder, initial_balance=0):
        """Initialize account."""
        Account._account_counter += 1
        self.account_number = f"ACC{Account._account_counter}"
        self.account_holder = account_holder
        self._balance = initial_balance
        self._transactions = []
        self._is_active = True
        
        # Record initial deposit
        if initial_balance > 0:
            self._add_transaction("Initial Deposit", initial_balance)
    
    @property
    def balance(self):
        """Get account balance."""
        return self._balance
    
    @abstractmethod
    def get_account_type(self):
        """Get account type - must be implemented by subclasses."""
        pass
    
    def _add_transaction(self, transaction_type, amount, balance_after=None):
        """Add transaction to history."""
        if balance_after is None:
            balance_after = self._balance
        
        transaction = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "type": transaction_type,
            "amount": amount,
            "balance": balance_after
        }
        self._transactions.append(transaction)
    
    def deposit(self, amount):
        """Deposit money to account."""
        if not self._is_active:
            return "Account is inactive"
        
        if amount <= 0:
            return "Deposit amount must be positive"
        
        self._balance += amount
        self._add_transaction("Deposit", amount)
        return f"✓ Deposited ₹{amount}. New balance: ₹{self._balance}"
    
    def withdraw(self, amount):
        """Withdraw money from account."""
        if not self._is_active:
            return "Account is inactive"
        
        if amount <= 0:
            return "Withdrawal amount must be positive"
        
        if amount > self._balance:
            return f"✗ Insufficient funds. Balance: ₹{self._balance}"
        
        self._balance -= amount
        self._add_transaction("Withdrawal", amount)
        return f"✓ Withdrew ₹{amount}. New balance: ₹{self._balance}"
    
    def get_statement(self, last_n=10):
        """Get account statement."""
        print(f"\n--- Account Statement ---")
        print(f"Account: {self.account_number}")
        print(f"Holder: {self.account_holder}")
        print(f"Type: {self.get_account_type()}")
        print(f"Balance: ₹{self._balance}")
        print(f"\nLast {last_n} Transactions:")
        print(f"{'Date/Time':<20} {'Type':<15} {'Amount':>10} {'Balance':>10}")
        print("-" * 60)
        
        for trans in self._transactions[-last_n:]:
            print(f"{trans['timestamp']:<20} {trans['type']:<15} "
                  f"₹{trans['amount']:>9.2f} ₹{trans['balance']:>9.2f}")
    
    def close_account(self):
        """Close account."""
        self._is_active = False
        return f"✓ Account {self.account_number} closed"
    
    def __str__(self):
        """String representation."""
        status = "Active" if self._is_active else "Closed"
        return (f"{self.get_account_type()} #{self.account_number}\n"
                f"Holder: {self.account_holder}\n"
                f"Balance: ₹{self._balance}\n"
                f"Status: {status}")

# Savings Account
class SavingsAccount(Account):
    """Savings account with interest."""
    
    def __init__(self, account_holder, initial_balance=0, interest_rate=0.04):
        super().__init__(account_holder, initial_balance)
        self.interest_rate = interest_rate
        self.minimum_balance = 1000
    
    def get_account_type(self):
        return "Savings Account"
    
    def withdraw(self, amount):
        """Override withdraw to check minimum balance."""
        if self._balance - amount < self.minimum_balance:
            return (f"✗ Cannot withdraw. Minimum balance of ₹{self.minimum_balance} "
                   f"must be maintained")
        
        return super().withdraw(amount)
    
    def add_interest(self):
        """Add interest to balance."""
        if not self._is_active:
            return "Account is inactive"
        
        interest = self._balance * self.interest_rate
        self._balance += interest
        self._add_transaction("Interest Credit", interest)
        return f"✓ Interest added: ₹{interest:.2f}"

# Current Account
class CurrentAccount(Account):
    """Current account with overdraft facility."""
    
    def __init__(self, account_holder, initial_balance=0, overdraft_limit=10000):
        super().__init__(account_holder, initial_balance)
        self.overdraft_limit = overdraft_limit
    
    def get_account_type(self):
        return "Current Account"
    
    def withdraw(self, amount):
        """Override withdraw to allow overdraft."""
        if not self._is_active:
            return "Account is inactive"
        
        if amount <= 0:
            return "Withdrawal amount must be positive"
        
        available = self._balance + self.overdraft_limit
        if amount > available:
            return (f"✗ Insufficient funds. Available: ₹{available} "
                   f"(Balance: ₹{self._balance} + Overdraft: ₹{self.overdraft_limit})")
        
        self._balance -= amount
        self._add_transaction("Withdrawal", amount)
        
        if self._balance < 0:
            return (f"✓ Withdrew ₹{amount}. Balance: ₹{self._balance} "
                   f"(Using ₹{abs(self._balance)} overdraft)")
        
        return f"✓ Withdrew ₹{amount}. New balance: ₹{self._balance}"

# Fixed Deposit Account
class FixedDepositAccount(Account):
    """Fixed deposit account - cannot withdraw before maturity."""
    
    def __init__(self, account_holder, amount, tenure_months, interest_rate=0.07):
        super().__init__(account_holder, amount)
        self.tenure_months = tenure_months
        self.interest_rate = interest_rate
        self.maturity_date = None
        self._calculate_maturity()
    
    def get_account_type(self):
        return f"Fixed Deposit ({self.tenure_months} months)"
    
    def _calculate_maturity(self):
        """Calculate maturity details."""
        from datetime import timedelta
        self.maturity_date = datetime.now() + timedelta(days=30 * self.tenure_months)
        
        # Simple interest calculation
        interest = self._balance * self.interest_rate * (self.tenure_months / 12)
        self.maturity_amount = self._balance + interest
    
    def withdraw(self, amount):
        """Cannot withdraw from FD before maturity."""
        return (f"✗ Cannot withdraw from Fixed Deposit before maturity. "
               f"Maturity date: {self.maturity_date.strftime('%Y-%m-%d')}")
    
    def break_fd(self):
        """Break FD before maturity (with penalty)."""
        penalty = self._balance * 0.01  # 1% penalty
        final_amount = self._balance - penalty
        
        self._balance = 0
        self._add_transaction("FD Broken (Penalty Applied)", final_amount)
        self._is_active = False
        
        return (f"✓ FD broken. Penalty: ₹{penalty:.2f}. "
               f"Amount credited: ₹{final_amount:.2f}")
    
    def mature_fd(self):
        """Mature the FD."""
        self._balance = self.maturity_amount
        interest = self.maturity_amount - self._transactions[0]["amount"]
        self._add_transaction("FD Matured (Interest)", interest)
        
        return (f"✓ FD matured. Principal: ₹{self._transactions[0]['amount']}, "
               f"Interest: ₹{interest:.2f}, Total: ₹{self.maturity_amount:.2f}")
    
    def get_maturity_info(self):
        """Get FD maturity information."""
        return (f"Principal: ₹{self._transactions[0]['amount']}\n"
               f"Interest Rate: {self.interest_rate * 100}%\n"
               f"Tenure: {self.tenure_months} months\n"
               f"Maturity Date: {self.maturity_date.strftime('%Y-%m-%d')}\n"
               f"Maturity Amount: ₹{self.maturity_amount:.2f}")

# Bank class to manage accounts
class Bank:
    """Bank managing multiple accounts."""
    
    def __init__(self, name):
        self.name = name
        self.accounts = {}
    
    def create_account(self, account_type, account_holder, **kwargs):
        """Create new account."""
        account_types = {
            "savings": SavingsAccount,
            "current": CurrentAccount,
            "fd": FixedDepositAccount
        }
        
        if account_type not in account_types:
            return f"✗ Invalid account type: {account_type}"
        
        account_class = account_types[account_type]
        account = account_class(account_holder, **kwargs)
        self.accounts[account.account_number] = account
        
        return f"✓ Created {account.get_account_type()} #{account.account_number}"
    
    def get_account(self, account_number):
        """Get account by number."""
        return self.accounts.get(account_number)
    
    def transfer(self, from_account_num, to_account_num, amount):
        """Transfer money between accounts."""
        from_account = self.get_account(from_account_num)
        to_account = self.get_account(to_account_num)
        
        if not from_account or not to_account:
            return "✗ Invalid account number"
        
        # Withdraw from source
        result = from_account.withdraw(amount)
        if "✗" in result:
            return result
        
        # Deposit to destination
        to_account.deposit(amount)
        
        # Add transfer transaction
        from_account._add_transaction(f"Transfer to {to_account_num}", amount)
        to_account._add_transaction(f"Transfer from {from_account_num}", amount)
        
        return f"✓ Transferred ₹{amount} from {from_account_num} to {to_account_num}"
    
    def get_total_deposits(self):
        """Get total deposits in bank."""
        return sum(acc.balance for acc in self.accounts.values())
    
    def list_accounts(self):
        """List all accounts."""
        print(f"\n--- {self.name} - All Accounts ---")
        print(f"{'Account Number':<15} {'Type':<20} {'Holder':<20} {'Balance':>12}")
        print("-" * 70)
        
        for acc in self.accounts.values():
            print(f"{acc.account_number:<15} {acc.get_account_type():<20} "
                  f"{acc.account_holder:<20} ₹{acc.balance:>10.2f}")
        
        print(f"\nTotal Deposits: ₹{self.get_total_deposits():.2f}")

# Demo Banking System
print("\n--- Demo: Banking System ---\n")

# Create bank
bank = Bank("Python Bank")

# Create accounts
print(bank.create_account("savings", "Bina Pithadiya", initial_balance=50000))
print(bank.create_account("current", "Raj Kumar", initial_balance=100000, overdraft_limit=20000))
print(bank.create_account("fd", "Priya Sharma", amount=200000, tenure_months=12))

# Get accounts
bina_acc = bank.get_account("ACC1001")
raj_acc = bank.get_account("ACC1002")
priya_acc = bank.get_account("ACC1003")

# Transactions
print("\n--- Transactions ---")
print(bina_acc.deposit(10000))
print(bina_acc.withdraw(5000))

print(raj_acc.withdraw(110000))  # Using overdraft

# Transfer
print("\n--- Transfer ---")
print(bank.transfer("ACC1001", "ACC1002", 15000))

# Interest
print("\n--- Interest ---")
print(bina_acc.add_interest())

# FD Info
print("\n--- Fixed Deposit Info ---")
print(priya_acc.get_maturity_info())

# Statements
bina_acc.get_statement()
raj_acc.get_statement()

# List all accounts
bank.list_accounts()

print("\n" + "=" * 60)
print("Banking System Demo Complete!")
print("=" * 60)