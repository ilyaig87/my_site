# LibSQL Studio - phpMyAdmin ל-Turso 🎨

## מה זה LibSQL Studio?
UI חזותי **בדיוק כמו phpMyAdmin** אבל ל-Turso/SQLite!

---

## התקנה (30 שניות):

```bash
npm install -g libsql-studio
```

---

## הפעלה:

```bash
libsql-studio --db libsql://database-site-craft-vercel-icfg-6lkrhhvumfltrrzlwejnvqbf.aws-us-east-1.turso.io --auth-token eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM1ODM4OTEsImlkIjoiYWE2OWViNzAtODc0Ni00MDVkLWE3Y2QtMDRlOTA3ZjU0ZDc2IiwicmlkIjoiMTcwYzc5OWUtYzRkZi00MjgwLWIzYzQtNWI2YjExN2YwNmU0In0.gEjRY2ARi3X0wZi-z5s5SgSmVK0N5hgxzxTzn7HNIH5sxoALFvpdy3LT_q1yk6kAVUzEJvU9MeioglKY5PNYBw
```

**זה יפתח UI בדפדפן על http://localhost:8080**

---

## מה תוכל לעשות:

✅ לראות את כל הטבלאות (כמו phpMyAdmin)
✅ לדפדף בנתונים (Browse)
✅ להריץ SQL queries
✅ לערוך/למחוק שורות
✅ לראות structure של הטבלה
✅ לייצא נתונים

---

## קיצור דרך:

צור קובץ `studio.bat` בשורש הפרויקט:

```bat
@echo off
libsql-studio --db %TURSO_DATABASE_URL% --auth-token %TURSO_AUTH_TOKEN%
```

ואז פשוט תריץ:
```bash
studio.bat
```

זה יפתח את ה-UI אוטומטית!

---

זה ממש כמו phpMyAdmin! 🎉
