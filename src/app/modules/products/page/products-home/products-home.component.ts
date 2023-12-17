import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productService: ProductsService,
    private productsDataTransferService: ProductsDataTransferService,
    private router: Router,
    private messageServiice: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas() {
    const productsLoaded = this.productsDataTransferService.getProductsDatas();
    if (productsLoaded.length > 0) {
      this.productsDatas = productsLoaded;
    } else {
      this.getAPIProductsDatas();
    }
  }

  getAPIProductsDatas() {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageServiice.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      console.log(event);
    }
  }

  handleDeleteProductAction(event: {
    productId: string;
    productName: string;
  }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event?.productName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-esclammtion-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.productId),
      });
    }
  }
  deleteProduct(productId: string) {
    if (productId) {
      this.productService
        .deleteProduct(productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageServiice.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso!',
                life: 2500,
              });
              this.getAPIProductsDatas();
            }
          },
          error: (err) => {
            console.log(err);
            this.messageServiice.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover produto!',
              life: 2500,
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
