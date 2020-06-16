import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../model/product";
import {ProductAreaService} from "../../../service/product-area.service";
import {ProductArea} from "../../../model/productArea";
import {MyErrorStateMatcher} from "../../register/register.component";
import {Image} from "../../../model/image";
import {ImageService} from "../../../service/image.service";
import {ProductService} from "../../../service/product.service";
import {StoreComponent} from "../../store/store.component";
import {ProductComponent} from "../product.component";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  title: string;
  productForm: FormGroup;
  product: Product;
  productAreas: ProductArea[];
  matcher = new MyErrorStateMatcher();
  // IMAGE ATTRIBUTES TO MANAGE UPLOAD
  imageToUpload: any;
  image: Image;
  uploadPercent = '0';
  constructor(private formBuilder: FormBuilder,
              private productAreaService: ProductAreaService,
              private imageService: ImageService,
              private productService: ProductService,
              private dialogStore:MatDialogRef<StoreComponent>,
              private dialogProd:MatDialogRef<ProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.uploadPercent = '0';
    this.getProductAreas();
    if(this.data.type=='create'){
      this.buildFormtoCreate();
      this.title='Nuevo Producto';
    }else{
      this.product = data.product;
      this.title = 'Editar producto';
      console.log(this.product);
      this.buildFormtoEdit();
    }
  }

  ngOnInit(): void {
  }
  buildFormtoCreate(){
    this.productForm = this.formBuilder.group({
      name: new FormControl('',[
        Validators.required
      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.maxLength(100)
      ]),
      price: new FormControl('',[
        Validators.required
      ]),
      store: this.formBuilder.group({
        id: new FormControl(this.data.storeId,[
          Validators.required
        ])
      }),
      image: this.formBuilder.group({
        id: new FormControl('',[
          Validators.required
        ])
      }),
      area: this.formBuilder.group({
        id: new FormControl('',[
          Validators.required
        ])
      })
    });
  }
  buildFormtoEdit(){
    this.productForm = this.formBuilder.group({
      id: new FormControl(this.product.id, [
      ]),
      name: new FormControl(this.product.name,[
        Validators.required
      ]),
      description: new FormControl(this.product.description,[
        Validators.required
      ]),
      price: new FormControl(this.product.price,[
        Validators.required
      ]),
      image: this.formBuilder.group({
        id: new FormControl(this.product.image.id,[
          Validators.required
        ])
      }),
      area: this.formBuilder.group({
        id: new FormControl(this.product.area.id,[
          Validators.required
        ])
      })
    });
  }
  getProductAreas(){
    this.productAreaService.getAll().subscribe( data => {
      this.productAreas = data;
    },
      error => {
      console.log('An error has ocurred: '+ error.message);
      });
  }

  // Detect file changes in file input
  onFileSelected(e: any){
    this.imageToUpload = e.target.files[0];
    this.uploadPercent = '0';
  }
  onUpload(){
    this.uploadPercent = '50';
    const formData = new FormData();
    formData.append('file', this.imageToUpload);
    this.imageService.post(formData).subscribe( async(data) => {
      console.log('Image uploaded succesfully');
      this.uploadPercent = '100';
      let id = await data.id;
      this.productForm.get('image').get('id').setValue(id);
    },error => {
      console.log('An error has ocurred: '+ error.message);
      this.uploadPercent = '0';
      }
    );
  }
  submitProduct(product: any){
    if(this.title == 'Nuevo Producto'){
      // WE CREATE THE PRODUCT
      this.productService.post(product).subscribe( res =>{
        console.log('Product created succesfully');
        this.dialogStore.close();
      }, error => {
        console.log('An error has ocurred: '+ error.message);
      });

    }else{
      // WE UPDATE THE PRODUCT
      this.productService.putById(product.id, product).subscribe( res => {
        console.log('Product updated succesfuly');
        this.dialogProd.close();
      }, error => {
        console.log('An error has ocurred: '+ error.message);
        console.log(product);
      });
    }
  }
}
