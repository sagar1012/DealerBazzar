export class Files{
    id: number;
    name:string;
    size:number;
    type:string;
    content: string;

    constructor(id: number, name: string, size:number, type:string, content: string){
      this.id = id,
      this.name = name,
      this.size = size,
      this.type = type,
      this.content = content
    }
}