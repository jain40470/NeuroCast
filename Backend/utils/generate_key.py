
# FOR FERNET
from cryptography.fernet import Fernet
print(Fernet.generate_key().decode())

# FOR JWT
import secrets
print(secrets.token_hex(32))


