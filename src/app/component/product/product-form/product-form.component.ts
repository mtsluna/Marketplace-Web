import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
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
  onSave: boolean = false;
  title: string;
  imageForm: FormGroup;
  productForm: FormGroup;
  product: Product;
  productAreas: ProductArea[];
  matcher = new MyErrorStateMatcher();
  // IMAGE ATTRIBUTES TO MANAGE UPLOAD
  imageToUpload: any;
  isPresent: boolean = false;
  image: Image;
  uploadPercent = '0';
  @Output() productChange = new EventEmitter<Product>();
  @Output() productDelete = new EventEmitter<number>();
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
      this.buildImageForm();
      this.title='Nuevo Producto';
    }else{
      this.product = data.product;
      this.title = 'Editar producto';
      this.buildFormtoEdit();
      this.buildImageForm();
    }
  }

  ngOnInit(): void {
  }

  buildImageForm(){
    this.imageForm = this.formBuilder.group({
      file: new FormControl('', [
        Validators.required
      ])
    })
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
        file: new FormControl(null, [
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
        id: new FormControl(this.product.image.id, []),
        file: new FormControl(this.product.image, [
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
    this.isPresent = true;
  }

  submitProduct(product: any){
    this.onSave = true;
    this.uploadPercent = '50';
    const formData = new FormData();
    formData.append('file', this.imageToUpload);
    console.log("1-"+product.image.id)
    console.log("2-"+this.productForm.get('image').get('file').value)
    if(this.imageToUpload == null){
      this.productService.putById(product.id, product).subscribe( res => {
        this.dialogProd.close(res);
      }, error => {

      });
    }
    else{
      this.imageService.post(formData).subscribe( async(data) => {
          this.uploadPercent = '100';
          let id = await data.id;
          //this.productForm.get('image').get('id').setValue(id);
          product.image.id = id;
          this.isPresent = true
          if(this.title == 'Nuevo Producto'){
            this.productService.post(product).subscribe( res =>{
              this.dialogStore.close(res);
            }, error => {

            });
          } else {
            this.productService.putById(product.id, product).subscribe( res => {
              this.dialogProd.close(res);
            }, error => {

            });
          }
        },error => {
          this.isPresent = true;
          this.uploadPercent = '0';
        }
      );
    }
  }
}
