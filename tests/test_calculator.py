# tests/test_calculator.py

import pytest
from calculator import add, subtract, multiply, divide, is_even, BankAccount

# Basic tests
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_subtract():
    assert subtract(5, 3) == 2
    assert subtract(10, 15) == -5

def test_multiply():
    assert multiply(3, 4) == 12
    assert multiply(-2, 3) == -6
    assert multiply(0, 100) == 0

def test_divide():
    assert divide(10, 2) == 5
    assert divide(9, 3) == 3
    assert divide(7, 2) == 3.5

# Testing exceptions
def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)

# Parametrized tests (test multiple inputs)
@pytest.mark.parametrize("n,expected", [
    (2, True),
    (3, False),
    (4, True),
    (5, False),
    (0, True),
])
def test_is_even(n, expected):
    assert is_even(n) == expected

# Testing classes with fixtures
@pytest.fixture
def bank_account():
    """Create a bank account for testing."""
    return BankAccount(100)

def test_bank_account_deposit(bank_account):
    new_balance = bank_account.deposit(50)
    assert new_balance == 150
    assert bank_account.balance == 150

def test_bank_account_withdraw(bank_account):
    new_balance = bank_account.withdraw(30)
    assert new_balance == 70
    assert bank_account.balance == 70

def test_bank_account_withdraw_insufficient(bank_account):
    with pytest.raises(ValueError, match="Insufficient funds"):
        bank_account.withdraw(200)

def test_bank_account_deposit_negative(bank_account):
    with pytest.raises(ValueError, match="must be positive"):
        bank_account.deposit(-50)

# Multiple fixtures
@pytest.fixture
def empty_account():
    return BankAccount(0)

@pytest.fixture
def rich_account():
    return BankAccount(10000)

def test_empty_account(empty_account):
    assert empty_account.balance == 0
    empty_account.deposit(100)
    assert empty_account.balance == 100

def test_rich_account(rich_account):
    assert rich_account.balance == 10000
    rich_account.withdraw(5000)
    assert rich_account.balance == 5000