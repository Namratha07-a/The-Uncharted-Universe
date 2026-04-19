╔══════════════════════════════════════════════════════════════════╗
║          UNCHARTED UNIVERSE — Image Reference Guide              ║
╚══════════════════════════════════════════════════════════════════╝

Place your images in this folder, then update the HTML as described.

━━━ CHARACTERS PAGE (characters.html) ━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE NAME              SIZE          CHARACTER
nathan-drake.jpg       400 x 500 px  Nathan Drake
victor-sullivan.jpg    400 x 500 px  Victor Sullivan
elena-fisher.jpg       400 x 500 px  Elena Fisher
samuel-drake.jpg       400 x 500 px  Samuel Drake

In each card, find the comment:
  <!-- TO ADD IMAGE: replace the div above with:
       <img src="images/nathan-drake.jpg" alt="Nathan Drake" class="char-avatar"> -->

Delete the entire <div class="img-placeholder">...</div> block
and paste in the <img> tag shown in the comment.

━━━ GAMES PAGE (games.html) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE NAME              SIZE          GAME
drakes-fortune.jpg     400 x 280 px  Uncharted 1 (2007)
among-thieves.jpg      400 x 280 px  Uncharted 2 (2009)
drakes-deception.jpg   400 x 280 px  Uncharted 3 (2011)
a-thiefs-end.jpg       400 x 280 px  Uncharted 4 (2016)
the-lost-legacy.jpg    400 x 280 px  The Lost Legacy (2017)

Find the comment in each game card:
  <!-- TO ADD IMAGE: remove the div above and add:
       <img src="images/drakes-fortune.jpg" alt="..." class="game-cover-img"> -->

Delete the img-placeholder div and paste in the <img> tag.

━━━ HOME PAGE (index.html) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE NAME              SIZE           LOCATION
hero-bg.jpg            1920 x 1080 px Main hero background

Find: <div class="hero-bg">
Add:  <div class="hero-bg" style="background-image: url('images/hero-bg.jpg');">

━━━ MOVIE PAGE (movie.html) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE NAME              SIZE          LOCATION
movie-poster.jpg       400 x 600 px  Hero area (right side)

Find the .movie-poster-ph placeholder div and replace with:
  <img src="images/movie-poster.jpg" alt="Uncharted Movie Poster" class="movie-poster-img">

━━━ LORE PAGE (lore.html) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE NAME              SIZE          TREASURE
el-dorado.jpg          120 x 120 px  El Dorado idol
cintamani-stone.jpg    120 x 120 px  Cintamani Stone gem
iram-pillars.jpg       120 x 120 px  Iram of the Pillars
libertalia.jpg         120 x 120 px  Libertalia Treasury
tusk-ganesh.jpg        120 x 120 px  Tusk of Ganesh
drakes-ring.jpg        120 x 120 px  Drake's Ring

Each has a <!-- TO ADD IMAGE --> comment. Replace the emoji <span>
with: <img src="images/<filename>.jpg" alt="..." class="treasure-icon-img">

━━━ MUSIC ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Click the Music button (navbar) to open the player panel.
Use "Upload Your Own Music" to load MP3/WAV/OGG from your device.
The built-in ambient tones use the Web Audio API (no files needed).

━━━ TIPS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• JPG or WebP for photos (smaller files)
• Dark, moody images suit the gold/dark theme best
• CSS classes (char-avatar, game-cover-img etc) handle all
  sizing, hover effects, and filters automatically
