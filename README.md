<p>Module 'querySelector_NodeJS_edition.js' can be used as:
  <b>const parserHtml = require('./querySelector_NodeJS_edition');</b>
</p>
<br>
<p>
<code>const body = parserHtml(html);</code><br>
<code>const parsedName = html.querySelector('p','.name')</code><br>
<code>   //class="name">John</code>
</p>
<p>
<code>const parsedName = html.querySelector('a','[href^="tel"]')</code><br>
<code>   //href="tel:123456789">123456789</code>
</p>
<p>
<code>const parsedName = html.querySelector('a','[href^="tel"]', {text: true})</code><br>
<code>   //123456789</code><br><br>
</p>
