// ParsleyConfig definition if not already set
// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('es', {
  defaultMessage: "Este valor parece ser inválido.",
  type: {
    email:        "La cuenta ingresada tiene un formato inválido.",
    url:          "Este valor debe ser una URL válida.",
    number:       "Este valor debe ser un número válido.",
    integer:      "Este valor debe ser un número válido.",
    digits:       "Este valor debe ser un dígito válido.",
    alphanum:     "Este valor debe ser alfanumérico."
  },
  notblank:       "Este valor no debe estar en blanco.",
  required:       "Este valor es requerido.",
  pattern:        "Este valor es incorrecto.",
  min:            "Este valor no debe ser menor que %s.",
  max:            "Este valor no debe ser mayor que %s.",
  range:          "Este valor debe estar entre %s y %s.",
  minlength:      "Este valor es muy corto. La longitud mínima es de %s caracteres.",
  maxlength:      "Este valor es muy largo. La longitud máxima es de %s caracteres.",
  length:         "La longitud de este valor debe estar entre %s y %s caracteres.",
  mincheck:       "Debe seleccionar al menos %s opciones.",
  maxcheck:       "Debe seleccionar %s opciones o menos.",
  check:          "Debe seleccionar entre %s y %s opciones.",
  equalto:        "Este valor debe ser idéntico."
});

Parsley.setLocale('es');

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvcGFyc2xleS9Mb2NhbGUvZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUGFyc2xleUNvbmZpZyBkZWZpbml0aW9uIGlmIG5vdCBhbHJlYWR5IHNldFxuLy8gVmFsaWRhdGlvbiBlcnJvcnMgbWVzc2FnZXMgZm9yIFBhcnNsZXlcbi8vIExvYWQgdGhpcyBhZnRlciBQYXJzbGV5XG5cblBhcnNsZXkuYWRkTWVzc2FnZXMoJ2VzJywge1xuICBkZWZhdWx0TWVzc2FnZTogXCJFc3RlIHZhbG9yIHBhcmVjZSBzZXIgaW52w6FsaWRvLlwiLFxuICB0eXBlOiB7XG4gICAgZW1haWw6ICAgICAgICBcIkxhIGN1ZW50YSBpbmdyZXNhZGEgdGllbmUgdW4gZm9ybWF0byBpbnbDoWxpZG8uXCIsXG4gICAgdXJsOiAgICAgICAgICBcIkVzdGUgdmFsb3IgZGViZSBzZXIgdW5hIFVSTCB2w6FsaWRhLlwiLFxuICAgIG51bWJlcjogICAgICAgXCJFc3RlIHZhbG9yIGRlYmUgc2VyIHVuIG7Dum1lcm8gdsOhbGlkby5cIixcbiAgICBpbnRlZ2VyOiAgICAgIFwiRXN0ZSB2YWxvciBkZWJlIHNlciB1biBuw7ptZXJvIHbDoWxpZG8uXCIsXG4gICAgZGlnaXRzOiAgICAgICBcIkVzdGUgdmFsb3IgZGViZSBzZXIgdW4gZMOtZ2l0byB2w6FsaWRvLlwiLFxuICAgIGFscGhhbnVtOiAgICAgXCJFc3RlIHZhbG9yIGRlYmUgc2VyIGFsZmFudW3DqXJpY28uXCJcbiAgfSxcbiAgbm90Ymxhbms6ICAgICAgIFwiRXN0ZSB2YWxvciBubyBkZWJlIGVzdGFyIGVuIGJsYW5jby5cIixcbiAgcmVxdWlyZWQ6ICAgICAgIFwiRXN0ZSB2YWxvciBlcyByZXF1ZXJpZG8uXCIsXG4gIHBhdHRlcm46ICAgICAgICBcIkVzdGUgdmFsb3IgZXMgaW5jb3JyZWN0by5cIixcbiAgbWluOiAgICAgICAgICAgIFwiRXN0ZSB2YWxvciBubyBkZWJlIHNlciBtZW5vciBxdWUgJXMuXCIsXG4gIG1heDogICAgICAgICAgICBcIkVzdGUgdmFsb3Igbm8gZGViZSBzZXIgbWF5b3IgcXVlICVzLlwiLFxuICByYW5nZTogICAgICAgICAgXCJFc3RlIHZhbG9yIGRlYmUgZXN0YXIgZW50cmUgJXMgeSAlcy5cIixcbiAgbWlubGVuZ3RoOiAgICAgIFwiRXN0ZSB2YWxvciBlcyBtdXkgY29ydG8uIExhIGxvbmdpdHVkIG3DrW5pbWEgZXMgZGUgJXMgY2FyYWN0ZXJlcy5cIixcbiAgbWF4bGVuZ3RoOiAgICAgIFwiRXN0ZSB2YWxvciBlcyBtdXkgbGFyZ28uIExhIGxvbmdpdHVkIG3DoXhpbWEgZXMgZGUgJXMgY2FyYWN0ZXJlcy5cIixcbiAgbGVuZ3RoOiAgICAgICAgIFwiTGEgbG9uZ2l0dWQgZGUgZXN0ZSB2YWxvciBkZWJlIGVzdGFyIGVudHJlICVzIHkgJXMgY2FyYWN0ZXJlcy5cIixcbiAgbWluY2hlY2s6ICAgICAgIFwiRGViZSBzZWxlY2Npb25hciBhbCBtZW5vcyAlcyBvcGNpb25lcy5cIixcbiAgbWF4Y2hlY2s6ICAgICAgIFwiRGViZSBzZWxlY2Npb25hciAlcyBvcGNpb25lcyBvIG1lbm9zLlwiLFxuICBjaGVjazogICAgICAgICAgXCJEZWJlIHNlbGVjY2lvbmFyIGVudHJlICVzIHkgJXMgb3BjaW9uZXMuXCIsXG4gIGVxdWFsdG86ICAgICAgICBcIkVzdGUgdmFsb3IgZGViZSBzZXIgaWTDqW50aWNvLlwiXG59KTtcblxuUGFyc2xleS5zZXRMb2NhbGUoJ2VzJyk7XG4iXSwiZmlsZSI6InZlbmRvci9wYXJzbGV5L0xvY2FsZS9lcy5qcyJ9
