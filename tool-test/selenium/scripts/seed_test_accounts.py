"""
scripts/seed_test_accounts.py
Seeds the MongoDB database with pre-requisite test accounts required by tests.

Pre-seeded accounts:
  - existing@test.com   (active, so email-duplicate test can reference it)
  - active@test.com     (active, normal user)
  - locked@test.com     (isActive=False, used for locked-account test)
  - admin@test.com      (role='admin')

Run once before the full test suite:
    python scripts/seed_test_accounts.py
"""
import os
import sys
import datetime
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pymongo
import bcrypt
from utils.config import Config


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def seed():
    client = pymongo.MongoClient(Config.MONGODB_URI)
    db = client[Config.DB_NAME]

    accounts = [
        {
            "email":       "existing@test.com",
            "name":        "Existing User",
            "password":    hash_password("Abc@1234"),
            "role":        "user",
            "isActive":    True,
            "isEmailVerified": True,
        },
        {
            "email":       Config.ACTIVE_EMAIL,   # active@test.com
            "name":        "Active User",
            "password":    hash_password(Config.ACTIVE_PASSWORD),
            "role":        "user",
            "isActive":    True,
            "isEmailVerified": True,
        },
        {
            "email":       Config.LOCKED_EMAIL,   # locked@test.com
            "name":        "Locked User",
            "password":    hash_password(Config.LOCKED_PASSWORD),
            "role":        "user",
            "isActive":    False,          # <── locked
            "isEmailVerified": True,
        },
        {
            "email":       Config.ADMIN_EMAIL,    # admin@test.com
            "name":        "Admin User",
            "password":    hash_password(Config.ADMIN_PASSWORD),
            "role":        "admin",
            "isActive":    True,
            "isEmailVerified": True,
        },
    ]

    now = datetime.datetime.utcnow()
    created = 0

    for acc in accounts:
        # Delete if exist to ensure clean state
        db.users.delete_many({"email": acc["email"]})

        acc["createdAt"] = now
        acc["updatedAt"] = now
        result = db.users.insert_one(acc)
        uid = result.inserted_id

        # Auto-create personal workspace
        db.groups.insert_one({
            "name":        "Personal Workspace",
            "description": "Your personal workspace",
            "createdBy":   uid,
            "members":     [{"userId": uid, "role": None, "joinedAt": now}],
            "isPersonalWorkspace": True,
            "createdAt":   now,
            "updatedAt":   now,
        })

        print(f"  ✅ Created: {acc['email']} (role={acc['role']}, active={acc['isActive']})")
        created += 1

    client.close()
    print(f"\nDone. Created: {created}")


if __name__ == "__main__":
    print("🌱 Seeding test accounts into MongoDB...")
    seed()
