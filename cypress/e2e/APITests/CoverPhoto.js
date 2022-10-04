//Pojo for the coverPhotos endpoint
export default class CoverPhoto{

    constructor(id,idBook,url){
        this.id = id
        this.idBook = idBook
        this.url = url
    }

    getId(){
        return this.id
    }

    getBook(){
        return this.idBook
    }

    getUrl(){
        return this.url
    }
}
