"""
db_helper.py — MongoDB interaction for test verification & rollback
"""
import pymongo
from bson import ObjectId
from utils.config import Config


class DBHelper:
    def __init__(self):
        self.client = pymongo.MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.DB_NAME]

    # ── Users ────────────────────────────────────────────────────────────────
    def get_user_by_email(self, email: str):
        return self.db.users.find_one({"email": email.lower()})

    def delete_user_by_email(self, email: str):
        return self.db.users.delete_one({"email": email.lower()})

    def lock_user(self, email: str):
        return self.db.users.update_one(
            {"email": email.lower()},
            {"$set": {"isActive": False}}
        )

    def unlock_user(self, email: str):
        return self.db.users.update_one(
            {"email": email.lower()},
            {"$set": {"isActive": True}}
        )

    def set_user_role(self, email: str, role: str):
        """role: 'user' | 'admin' | 'superadmin'"""
        return self.db.users.update_one(
            {"email": email.lower()},
            {"$set": {"role": role}}
        )

    # ── Groups ───────────────────────────────────────────────────────────────
    def get_group_by_name(self, name: str):
        return self.db.groups.find_one({"name": name})

    def delete_group_by_name(self, name: str):
        return self.db.groups.delete_one({"name": name})

    # ── Tasks ────────────────────────────────────────────────────────────────
    def get_task_by_title(self, title: str):
        return self.db.tasks.find_one({"title": title})

    def delete_task_by_title(self, title: str):
        return self.db.tasks.delete_many({"title": title})

    # ── Notes ────────────────────────────────────────────────────────────────
    def get_note_by_title(self, title: str):
        return self.db.notes.find_one({"title": title})

    def delete_note_by_title(self, title: str):
        return self.db.notes.delete_many({"title": title})

    # ── Login History ─────────────────────────────────────────────────────────
    def get_login_history(self, email: str, limit: int = 5):
        user = self.get_user_by_email(email)
        if not user:
            return []
        return list(
            self.db.loginhistories
            .find({"userId": user["_id"]})
            .sort("createdAt", -1)
            .limit(limit)
        )

    # ── Notifications ─────────────────────────────────────────────────────────
    def count_notifications(self, email: str):
        user = self.get_user_by_email(email)
        if not user:
            return 0
        return self.db.notifications.count_documents({"recipient": user["_id"]})

    # ── Cleanup helpers ───────────────────────────────────────────────────────
    def cleanup_test_user(self, email: str):
        user = self.get_user_by_email(email)
        if user:
            uid = user["_id"]
            self.db.tasks.delete_many({"createdBy": uid})
            self.db.notes.delete_many({"owner": uid})
            self.db.groups.delete_many({"createdBy": uid})
            self.db.notifications.delete_many({"recipient": uid})
            self.db.loginhistories.delete_many({"userId": uid})
            self.db.users.delete_one({"_id": uid})

    def close(self):
        self.client.close()
