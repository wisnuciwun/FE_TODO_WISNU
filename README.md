## Getting Started

If you want to run locally, here a few steps:

```bash
# install all dependencies
npm i
```

```bash
# restore database and tables schema (using mysql not postgre)
npx prisma db push
```

```bash
# restore important data such as roles and status
npx prisma db seed
```

```bash
# run the project !
npm run dev
```

> open the website on http://localhost:3000

> to check api is running or not you can hit this http://localhost:3000/api/test

if you want to update schema from database to the project, do these steps :

```bash
npx prisma db pull
npx prisma generate
```
