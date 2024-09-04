import bcrypt

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = self.hash_password(password)  # Senha é armazenada já hasheada

    def hash_password(self, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

class UserManager:
    def __init__(self):
        self.users = {}

    def create_user(self, username, password):
        if username not in self.users:
            self.users[username] = User(username, password)
            return True
        return False

    def update_password(self, username, new_password):
        if username in self.users:
            self.users[username].password = self.users[username].hash_password(new_password)
            return True
        return False

    def delete_user(self, username):
        if username in self.users:
            del self.users[username]
            return True
        return False
