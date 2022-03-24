const strapi_uri = "http://localhost:1337"

const fetchIntroData = async () => {
  const url = `${strapi_uri}/api/intro?populate=header,practicalImage`;

  const response = await fetch(url);
  const data = await response.json();

  fillIntroData(data.data.attributes);
}

const fetchDevelopersData = async () => {
  const url = `${strapi_uri}/api/developers?populate=image`;

  const response = await fetch(url);
  const data = await response.json();

  fillDeveloperData(data.data);
}

const fetchFeaturesData = async () => {
  const url = `${strapi_uri}/api/features`;

  const response = await fetch(url);
  const data = await response.json();

  fillFeaturesData(data.data);
}

const fillIntroData = (data) => {
  const practicalInformationText = document.getElementById('strapi-practical-info-text')
  const practicalInformationImage = document.getElementById('strapi-practical-info-image')
  const headerImg = document.querySelector('.header-img')

  headerImg.style.backgroundImage = `url('${strapi_uri}${data.header.data.attributes.url}')`;

  practicalInformationText.innerHTML = data.practicalInformation
  practicalInformationImage.src = `${strapi_uri}${data.practicalImage.data.attributes.url}`
  practicalInformationImage.alt = data.practicalImage.data.attributes.caption
}

const fillDeveloperData = (data) => {
  const devContainer = document.querySelector('.meta-section')

  data.forEach((item) => {
    const image_url = `${strapi_uri}${item.attributes.image.data.attributes.url}`

    const container = document.createElement("article");

    const title = document.createElement("h2");
    title.innerHTML = item.attributes.name;

    const desc = document.createElement("p");
    desc.innerHTML = item.attributes.description;

    const image = document.createElement("img");
    image.src = image_url;
    image.alt = item.attributes.image.data.attributes.caption;

    container.appendChild(image);
    container.appendChild(title);
    container.appendChild(desc);
    devContainer.appendChild(container);

  })
}

const fillFeaturesData = (data) => {
  const featuresContainer = document.querySelector('.features')

  data.forEach((item) => {
    const container = document.createElement("article");

    const title = document.createElement("h2");
    title.innerHTML = item.attributes.title;

    const body = document.createElement("p");
    body.innerHTML = item.attributes.body;
    
    container.appendChild(title);
    container.appendChild(body);
    featuresContainer.appendChild(container);
  });
}


fetchIntroData();
fetchDevelopersData();
fetchFeaturesData();