function loadPage() {
  const body = document.querySelector("body");

  // Creates page header
  function createHeader() {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = "Dog API";

    body.appendChild(header);
    header.appendChild(title);

    // Creates page drop down
    function createSearch() {
      const select = document.createElement("select");
      const option = document.createElement("option");
      option.textContent = "Select a dog breed";

      header.appendChild(select);
      select.add(option);
    }

    // Creates download button
    function createDownload() {
      const downloadLink = document.createElement("button");
      downloadLink.classList.add("csvDownload");
      downloadLink.textContent = "Download History CSV File";

      header.appendChild(downloadLink);
    }

    createSearch();
    createDownload();
  }

  // Creates page main for all the dog cards
  function createMain() {
    const main = document.createElement("main");
    body.appendChild(main);
  }

  createHeader();
  createMain();
}

loadPage();
