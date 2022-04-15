# bootcamp-2022-nextjs

Next.js 研修（リクルート 63 期新人 BC＿エンジニアコース）の教材リポジトリです。  
開発環境に Node.js・Docker クライアントがインストールされていることを前提とします。

## install

```bash
npm i
```

## launch app

```bash
$ docker-compose up -d
$ npm run db:migrate
$ npm run dev
```

課題用にエラーを残しています。はじめは本番サーバーをビルドできません。

## 課題

- 課題１：エラー「オブジェクトは 'undefined' である可能性があります」を消すには？
- 課題２：const user: User | null の推論を、const user: User にするためには？
- 課題３：ユーザー詳細を表示してみて
- 課題４：req.query から id を取得し、PrismaClient でユーザーを更新してみて
- 課題５：req.query から id を取得し、PrismaClient でユーザーを物理削除してみて

課題 2 まで終わると、本番サーバーをビルド・起動できるようになります。

## 時間が余ったら

- ユーザー画面を参考に、記事投稿の CRUD 画面をつくってみよう
- ユーザー API を参考に、記事投稿の CRUD API をつくってみよう
- 制限時間まで、自由に作り込んでみてください
