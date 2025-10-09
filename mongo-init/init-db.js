// MongoDB initialization script for Qasr Alsultan Dashboard
// This script creates the initial database structure and indexes

// Switch to the application database
db = db.getSiblingDB("qasr_alsultan_db");

// Create application user (optional - for additional security)
// db.createUser({
//   user: "qasr_app_user",
//   pwd: "app_secure_password",
//   roles: [
//     {
//       role: "readWrite",
//       db: "qasr_alsultan_db"
//     }
//   ]
// });

// Create indexes for better performance
print("Creating indexes for better performance...");

// User indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });
db.users.createIndex({ role: 1 });

// Product indexes
db.products.createIndex({ slugEn: 1 }, { unique: true });
db.products.createIndex({ slugAr: 1 }, { unique: true });
db.products.createIndex({ categoriesId: 1 });
db.products.createIndex({ isFeatured: 1 });
db.products.createIndex({ isBestSeller: 1 });
db.products.createIndex({ createdAt: 1 });

// Category indexes
db.categories.createIndex({ slugEn: 1 }, { unique: true });
db.categories.createIndex({ slugAr: 1 }, { unique: true });

// Order indexes
db.orders.createIndex({ createdAt: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ isPaid: 1 });

// OrderItem indexes
db.orderitems.createIndex({ orderId: 1 });
db.orderitems.createIndex({ userId: 1 });
db.orderitems.createIndex({ productId: 1 });

// Banner indexes
db.banners.createIndex({ isFeatured: 1 });
db.banners.createIndex({ isArchived: 1 });
db.banners.createIndex({ createdAt: 1 });

// Account and Session indexes (for NextAuth)
db.accounts.createIndex(
  { provider: 1, providerAccountId: 1 },
  { unique: true }
);
db.accounts.createIndex({ userId: 1 });

db.sessions.createIndex({ sessionToken: 1 }, { unique: true });
db.sessions.createIndex({ userId: 1 });
db.sessions.createIndex({ expires: 1 });

db.verificationtokens.createIndex(
  { identifier: 1, token: 1 },
  { unique: true }
);

print("Database initialization completed successfully!");
print(
  "Created indexes for: users, products, categories, orders, banners, and auth tables"
);
