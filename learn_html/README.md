1. defer attribute in `<script>` will not run until after the page has loaded.

    **without the defer attribute, `console.log()` will throw an error.**

    index.html
    ```
    <script src="example.js" defer></script>
    ```

    example.js
    ```
    let idDiv = document.getElementById("example");

    console.log(idDiv.innerHTML);
    ```

2. white paper for the curriculum vitae in HTML.

    5 pages:
    1. Home -> Portfolio
    2. About -> Curriculum Vitae
    3. Contact
    4. Motivation Letter
    5. IT Core Values