class PhotoGallery{
  constructor(){
    this.API_key ='YOUR_API_KEY'; 
    this.galleryDiv = document.querySelector('.gallery');
    this.searchForm = document.querySelector('.header form');
    this.loadMore = document.querySelector('.load-more');
    this.logo = document.querySelector('.logo');
    this.pageIndex = 1;
    this.eventHandle();
  }
  eventHandle(){
    document.addEventListener('DOMContentLoaded', ()=>{
      this.getImg(this.pageIndex);
    });
    this.searchForm.addEventListener('submit', (e)=>{
      this.pageIndex = 1;
      this.getSearchedImages(e, this.pageIndex);
    });
    this.loadMore.addEventListener('click', this.loadMoreImages.bind(this));
    this.logo.addEventListener('click',()=>{
      this.pageIndex = 1;
      this.galleryDiv.innerHTML= '';
      this.getImg(this.pageIndex);
    })
  }
  async getImg(index){
    this.loadMore.setAttribute('data-img', 'curated');
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
    console.log(baseURL)
    const data = await this.fetchImages(baseURL);
    this.generateHTML(data.photos);
    // console.log(data)
  }
  async fetchImages(baseURL){
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: this.API_key
      }
    });
    const data = await response.json();
    console.log(data)
    return data;
  }
  generateHTML(photos){
    photos.forEach(photo=>{
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML=`
        <a href='${photo.src.original}' target="_blank">
          <img src="${photo.src.medium}">
          <h3>${photo.photographer}</h3>
        </a>
      `
      this.galleryDiv.appendChild(item)
    })
  }
  async getSearchedImages(e, index){
    this.loadMore.setAttribute('data-img', 'search');
    console.log(e)
    e.preventDefault();
    this.galleryDiv.innerHTML = '';
    const searchValue = e.target.querySelector('input').value;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=${index}&per_page=12`
    const data = await this.fetchImages(baseURL);
    this.generateHTML(data.photos);
    e.target.reset();
  }
  async getMoreSearchedImages(index){
    const searchValue = this.searchForm.querySelector('input').value;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=${index}&per_page=12`
    const data = await this.fetchImages(baseURL);
    this.generateHTML(data.photos);
  }
  loadMoreImages(){
    let index = ++this.pageIndex;
    console.log(index)
    const loadMoreData = this.loadMore.getAttribute('data-img');
    if(loadMoreData === 'curated'){
      this.getImg(index);
    }else{
      this.getMoreSearchedImages(index);
    }
  }
}
const gallery = new PhotoGallery;