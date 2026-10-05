# 🌟 Farcaster Scraper 🌟

Welcome to the **Farcaster Scraper**! This powerful CLI tool leverages the Neynar API to dive into the depths of Farcaster, allowing you to fetch, filter, and fine-tune your search for Imgur URLs based on specific criteria. Perfect for data enthusiasts, content creators, and meme lovers alike, our tool brings the vast universe of Farcaster content right to your command line.

## ✨ Features

- **Comprehensive Fetching:** Retrieve all posted content from your favorite Farcaster channels with ease.
- **Filtering:** Use likes, recasts, and follower counts to filter content, ensuring you only get the best.
- **Targeted Searches:** Specifically filter for images or URLs hosted on `imgur.com`, or customize it to your preference.

## 🚀 Installation

Embark on your Farcaster scraping adventure with these simple steps:

```bash
git clone https://github.com/aaronjmars/farcaster-scraper.git
cd farcaster-scraper
npm install
cp .env.example .env   # then set NEYNAR_API_KEY
```

The only config is `NEYNAR_API_KEY` (get one from [Neynar](https://neynar.com)). It is read from `.env` or your shell.

## 📚 How to Use

Once installed, dive into the world of Farcaster content by executing the `fetch` command with customizable options:

```bash
node src/index.js fetch --channelId="yourFavoriteChannel" --likeThreshold=50 --limit=100
```

Tailor your search with these options:

| Option | Default | What it does |
|---|---|---|
| `--channelId` | `memes` | Farcaster channel to read |
| `--likeThreshold` | `30` | Keep casts with more likes than this... |
| `--recastThreshold` | `15` | ...or more recasts than this |
| `--followerCountThreshold` | `20` | Author must have more followers than this |
| `--limit` | `100` | Casts per API page (max 100) |
| `--urlDomainFilter` | `imgur.com` | Only keep embed URLs containing this text |
| `--maxResults` | none | Stop after this many URLs |
| `--maxQueries` | none | Stop after this many API pages (with neither limit set, it reads until the feed ends) |

The tool pages through the channel feed (replies excluded), keeps casts that pass the thresholds, and prints each matching embed URL once per line, so you can pipe it to a file:

```bash
node src/index.js fetch --channelId=memes --maxQueries=10 > urls.txt
```

(for more information, run `node src/index.js fetch --help`)

## 🤝 Contributing

We're on the lookout for enthusiastic contributors who want to make Farcaster Scraper even better! 🌈 If you're ready to add features, fix bugs, or improve functionality, here's how you can join in:

1. **Fork** this repository to your own GitHub account.
2. **Clone** your fork and create a new branch for your contributions.
3. **Code** away your improvements.
4. **Commit** your changes with clear, descriptive messages.
5. **Push** your updates back to your fork on GitHub.
6. Open a **Pull Request** here, and let's discuss your awesome enhancements!

Thank you for considering contributing to Farcaster Scraper. Your efforts help make our community vibrant and our tool more effective!

---

Happy Scraping! 🎉 Dive into Farcaster content like never before with **Farcaster Scraper**.

---

Built by [Aaron Elijah Mars](https://aaronjmars.com), founder of Aeon and MiroShark · [@aaronjmars](https://github.com/aaronjmars)
