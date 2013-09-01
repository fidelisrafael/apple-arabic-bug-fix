# Apple Arabic Bug Workaround

This extension prevent browser crashing when [this message](https://gist.github.com/fidelisrafael/3469c7f137070e840b8e/raw/00c07780bc73a5b90451f1debf554c0921b81403/arabic-bug.txt)  appear on a web page. (only for facebook and twitter)

## How works

This extension observes DOM, using [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to replace the characters when it appears on a DOM Element.

## Install

Pack the extension using Chrome's tool in "Settings -> Tools -> Extensions" (_enable developer mode to enable "Load unpacked extesion" buttomn_)


## TODO
 - Tests
 - Test on Apple's mobile devices (for now i just tested this in Mac OS X 10.8.3)
 - Safari Extension
 - Use manifest.json to match facebook and twitter URL's (i'm lazy now)
 - Remove useless code

## License
The project is licensed under the MIT license. See LICENSE file for details.

## Screenshots
![alt "Twitter"](http://i.imgur.com/TCRqGLN.png) ![](http://i.imgur.com/9rK4NGK.png) ![](http://i.imgur.com/Y3MYElT.png) ![](http://i.imgur.com/EiMV1pt.png)

## Contribute
Please feel free to either fork me or post issues.
