---
title: "The Value of Coding Challenges"
date: "2014-01-18"
---

I recently spent some time doing coding practice with [Codility](https://codility.com/), a website that sets coding challenges and a time limit and grades your solution on various factors at the end (correctness, scalability, edge case handling etc.).

Most of the challenges are able to, or meant to be done using basic techniques such as primitive array and character manipulation, which is something I generally don’t need to do when working in a language with a rich library like Java. So it was a bit of a hurdle at first.

I found that there are certain techniques and patterns that emerge. The more I attempted, the more I was able to identify problems as being a certain category and therefore had a grasp of how to find the solution. For example a lot of array-based problems could be solved in one pass by sorting/using intermediate structures.

A lot of the time I also found myself shamefully scoring 20% or so because I’d forgotten one small thing, or used an i instead of a j. It’s quite humbling to see how easy it is to make a mistake when coding without the tools I usually have at my disposal. Thankfully when I first learnt Java I used a plain text editor with simple syntax highlighting and compiled/ran directly from the command line, so it wasn’t entirely unfamiliar to me.

A benefit of performing these challenges is that I feel I’ve improved my knowledge of Big O. Most of the problem descriptions included some expected level of time and space complexity, which meant I had to factor this in when coming up with an initial design. I’m now a little more confident identifying the traits of O(N) and O(N^2) problems and the like, which is something that’s important when designing scalable systems and should actively be borne in mind during the design and implementation phases in my opinion.

Ultimately I found it to be really interesting to get a chance to solve these sorts of problems that I don’t have much call to do in my usual day-to-day (focusing on higher-level problems such as GUI or web service design), and I feel it’s helped sharpen my skills. It’s definitely something I intend to keep up from time-to-time.

To round it off I’ve linked my solution to one of the medium-level problems below, the description of which is [here](https://www.quora.com/Kailash-Budhathoki/algorithm-exercises/Codility-Sigma-Problem). Note that due to the time limit I felt sloppy commenting was permissible!

```java
import java.util.ArrayList;

class Solution
{
    public int solution(int[] H)
    {
        // rules
        /*
        * so when we find two indices that are of the same height, we can use the same block,
        *  providing all the values in-between are higher.
        *
        * if we find a lower value, end the block.

        * idea - store a list of currently-active blocks. next interations can build
        * upon top of these.
        * once the height of an index is lower than an active block, remove that block
        * from activity, and add a new block equaling the index's height to the active list.

        * are we able to accurately track the number of blocks used by doing this?

        * Must be O(N) - no inner loops.
        * no addition or multiplication - should be safe using ints rather than longs.

        * extra - can we store blocks individual heights in the list rather than total
        * height? an int tracking total height?
        */

        int numberOfBlocks = 0;
        int totalHeight = 0;

        // depending on this being insertion-order.
        final ArrayList<Integer> activeBlocks = new ArrayList<Integer>();

        for (int i = 0; i < H.length; i++)
        {
            int height = H[i];

            if (totalHeight > height)
            {
                // remove block(s) - add another if necessary.
                // first trouble - how do we scan and remove lesser blocks in O(N) time...
                // is it still O(N)?
                for (int j = activeBlocks.size() - 1; j >= 0; j--)
                {
                    int latestBlock = activeBlocks.get(j);
                    activeBlocks.remove(j);
                    totalHeight -= latestBlock;

                    // removed the latest block and now we're not too high.
                    if ((totalHeight) <= height)
                    {
                        // we're done.
                        break;
                    }
                }

                // adding the other if necessary.
                if (totalHeight < height)
                {
                    int newBlock = height - totalHeight;
                    totalHeight += newBlock;
                    activeBlocks.add(newBlock);
                    numberOfBlocks++;
                }

            }
            else if (totalHeight == height)
            {
                continue;
            }
            else
            {
                int newBlock = height - totalHeight;
                activeBlocks.add(newBlock);
                totalHeight += newBlock;

                // add a block. increase total height.
                numberOfBlocks++;
            }
        }

        return numberOfBlocks;
    }
}
```

You can find the rest of my solutions, imperfections and all, on [GitHub](https://github.com/Ceva24/codility).

Thanks for reading.
