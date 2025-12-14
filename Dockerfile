Node.jsのバージョンを指定,
FROM node:18

作業ディレクトリを設定,
WORKDIR /app

appフォルダの中身をコピー,
COPY app/ .

依存パッケージをインストール,
RUN npm install

ポートを開放（Koyeb用、Botには不要だが指定が必要）,
EXPOSE 3000

Botを起動（index.jsを使っている場合）,
CMD ["node", "index.js"]
