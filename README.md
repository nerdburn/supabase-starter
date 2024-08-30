A Next.js starter repo that uses Supabase as a backend API service.

## Local development

Start by creating a `.env.local` file in the project root. You can use the [1Password Generator](https://1password.com/password-generator/) to create a random session secret easily.

```
NEXT_PUBLIC_ENV=dev
SESSION_SECRET=[random 32 char string]
NEXT_PUBLIC_SUPABASE_URL=[your supabase url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your supabase anon key]
```

Now install and run the project:

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn more

To learn more, take a look at the following resources:

- [Supabase Docs](https://supabase.com/docs) - Learn more about Supabase Postgres and Auth
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features
