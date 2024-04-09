import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
          imports: [ConfirmationDialogComponent, MatDialogModule ],
          providers: [
            { provide: MatDialogRef, useValue: {} }, // Use the mock MatDialogRef
            { provide: MAT_DIALOG_DATA, useValue: 'Are you sure?' } // Provide data for testing
          ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the confirmation message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('p')?.textContent;
    expect(message).toContain('Are you sure?'); // Check if data is displayed
  });
});
