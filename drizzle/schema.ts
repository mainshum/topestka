import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  foreignKey,
  varchar,
  int,
  unique,
  timestamp,
  mysqlEnum,
  tinyint,
  boolean,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const account = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<any>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const authenticator = mysqlTable(
	"authenticator",
	{
	  credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
	  userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	  providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	  credentialPublicKey: varchar("credentialPublicKey", {
		length: 255,
	  }).notNull(),
	  counter: int("counter").notNull(),
	  credentialDeviceType: varchar("credentialDeviceType", {
		length: 255,
	  }).notNull(),
	  credentialBackedUp: boolean("credentialBackedUp").notNull(),
	  transports: varchar("transports", { length: 255 }),
	},
	(authenticator) => ({
	  compositePk: primaryKey({
		columns: [authenticator.userId, authenticator.credentialID],
	  }),
	})
  );

export const completedItems = mysqlTable("completedItems", {
  userId: varchar({ length: 255 })
    .primaryKey()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  completedSubchapters: varchar({ length: 1000 }).default("NULL"),
  createdAt: timestamp({ mode: "string" }).notNull(),
});

export const session = mysqlTable("session", {
  sessionToken: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp({ mode: "string" }).notNull(),
});

export const transaction = mysqlTable("transaction", {
  sessionId: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  token: varchar({ length: 255 }).notNull(),
  amount: int().notNull(),
  status: mysqlEnum(["pending", "success", "failed"])
    .default("pending")
    .notNull(),
  updatedAt: timestamp({ mode: "string" }).notNull(),
});

export const user = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    hasAccess: boolean("hasAccess").default(false).notNull(),
    quizPassed: boolean("quizPassed").default(false).notNull(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      fsp: 3,
    }),
    image: varchar({ length: 255 }),
  },
  (table) => [unique("user_email_unique").on(table.email)]
);

export const verificationToken = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);
