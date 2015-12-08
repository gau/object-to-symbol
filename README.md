# README

Illustratorのオブジェクトやグループをシンボルに置き換えるスクリプトです。（[図入りの解説](http://graphicartsunit.tumblr.com/post/134802610854/object-to-symbol)）

-----

### 更新履歴

* 0.5.0：選択オブジェクトが大きときに警告を表示（公開）
* 0.4.0：新規作成

-----

### 対応バージョン

* Illustrator CS5／CS6／CC／CC 2014／CC 2015（19.2.0は未検証）

-----

### インストール方法

1. 以下の場所に、「シンボルに置き換え.jsx」をコピーします。Windows版ではお使いのIllustratorのモードによって保存する場所が異なりますのでご注意ください。

	* 【Mac】/Applications/Adobe Illustrator {バージョン}/Presets/ja_JP/スクリプト/
	* 【Win32】C:\Program Files\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
	* 【Win64】C:\Program Files\Adobe\Adobe Illustrator {バージョン} (64 Bit)\Presets\ja_JP\スクリプト\　または　C:\Program Files (x86)\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\

2. Illustratorを再起動します。
3. `ファイル > スクリプト > シンボルに置き換え`と表示されていればインストール成功です。

-----

### 使い方

1. 置き換えたいオブジェクトを選択します。（複数可）
2. `ファイル > スクリプト > シンボルに置き換え`を選択します。
3. ［シンボル］のポップアップメニューから目的のシンボルを選択します。
4. ［実行］をクリックします。

-----

### 注意

* グループはひとつのシンボルに置き換えられます。
* 選択オブジェクトの数が多いと処理にとても時間がかかりますので、一度に20個程度までを推奨します。数が多い場合は、数回に分けて実行してください。（20個以上のオブジェクトが選択されているときは警告が表示されます）
* 置き換えの位置は、オブジェクトやグループの中心を基準とします。アピアランスなどは大きさに含まれません。

-----

### 免責事項

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。
* CS5、CS6、CC、CC 2014、CC 2015（19.1.0まで）で動作の確認はしましたが、OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

-----

### ライセンス

* シンボルに置き換え.jsx
* Copyright © 2015 Toshiyuki Takahashi
* [Released under the MIT license](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)
