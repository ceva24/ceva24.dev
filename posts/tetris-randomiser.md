---
title: "The Tetris Randomiser in 20 Lines of Code"
date: "2015-07-17"
---

The Tetris Randomiser that chooses the next tetromino, implemented in Groovy. It could have been shorter, but with efficiency trade-offs.

I chose to implement the TGM2 variant, as described on the [Tetris Wiki](https://tetris.wikia.com/wiki/TGM_randomizer).

<!-- end -->

(Update: the wiki has since been updated with a version of the algorithm that is slightly different from the [one described when this post was originally made](https://tetris.fandom.com/wiki/TGM_randomizer?oldid=14149) – I’ve written a [new version of the algorithm](https://gist.github.com/Ceva24/065d64d2b7cbbe7cfe29) that is 35 lines long!)

```java
def rng = new Random()
def blocks = ['T', 'I', 'L', 'J', 'S', 'Z', 'O']
def history = ['Z', 'S', 'Z', 'S'] as ArrayDeque
def maxTilePosition = 4

def nextPiece = {

    def block

    for (i in 1..6) {
        block = blocks[rng.nextInt(maxTilePosition)]
        if (!(block in history)) break
    }

    maxTilePosition = 7

    history.remove()
    history.add(block)

    return block
}
```

It can be called by doing something like:

```java
20.times { print nextPiece() }
```

With output:

```
TIJLZTSIJLOSIZTJSOLI
```
