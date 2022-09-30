// ParsleyConfig definition if not already set
// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('es', {
  defaultMessage: "Este valor parece ser inválido.",
  type: {
    email:        "Este valor debe ser un correo válido.",
    url:          "Este valor debe ser una URL válida.",
    number:       "Este valor debe ser un número válido.",
    integer:      "Este valor debe ser un número válido.",
    digits:       "Este valor debe ser un dígito válido.",
    alphanum:     "Este valor debe ser alfanumérico."
  },
  notblank:       "Este valor no debe estar en blanco.",
  required:       "Este valor es requerido++.",
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvcGFyc2xleS9lcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBQYXJzbGV5Q29uZmlnIGRlZmluaXRpb24gaWYgbm90IGFscmVhZHkgc2V0XG4vLyBWYWxpZGF0aW9uIGVycm9ycyBtZXNzYWdlcyBmb3IgUGFyc2xleVxuLy8gTG9hZCB0aGlzIGFmdGVyIFBhcnNsZXlcblxuUGFyc2xleS5hZGRNZXNzYWdlcygnZXMnLCB7XG4gIGRlZmF1bHRNZXNzYWdlOiBcIkVzdGUgdmFsb3IgcGFyZWNlIHNlciBpbnbDoWxpZG8uXCIsXG4gIHR5cGU6IHtcbiAgICBlbWFpbDogICAgICAgIFwiRXN0ZSB2YWxvciBkZWJlIHNlciB1biBjb3JyZW8gdsOhbGlkby5cIixcbiAgICB1cmw6ICAgICAgICAgIFwiRXN0ZSB2YWxvciBkZWJlIHNlciB1bmEgVVJMIHbDoWxpZGEuXCIsXG4gICAgbnVtYmVyOiAgICAgICBcIkVzdGUgdmFsb3IgZGViZSBzZXIgdW4gbsO6bWVybyB2w6FsaWRvLlwiLFxuICAgIGludGVnZXI6ICAgICAgXCJFc3RlIHZhbG9yIGRlYmUgc2VyIHVuIG7Dum1lcm8gdsOhbGlkby5cIixcbiAgICBkaWdpdHM6ICAgICAgIFwiRXN0ZSB2YWxvciBkZWJlIHNlciB1biBkw61naXRvIHbDoWxpZG8uXCIsXG4gICAgYWxwaGFudW06ICAgICBcIkVzdGUgdmFsb3IgZGViZSBzZXIgYWxmYW51bcOpcmljby5cIlxuICB9LFxuICBub3RibGFuazogICAgICAgXCJFc3RlIHZhbG9yIG5vIGRlYmUgZXN0YXIgZW4gYmxhbmNvLlwiLFxuICByZXF1aXJlZDogICAgICAgXCJFc3RlIHZhbG9yIGVzIHJlcXVlcmlkbysrLlwiLFxuICBwYXR0ZXJuOiAgICAgICAgXCJFc3RlIHZhbG9yIGVzIGluY29ycmVjdG8uXCIsXG4gIG1pbjogICAgICAgICAgICBcIkVzdGUgdmFsb3Igbm8gZGViZSBzZXIgbWVub3IgcXVlICVzLlwiLFxuICBtYXg6ICAgICAgICAgICAgXCJFc3RlIHZhbG9yIG5vIGRlYmUgc2VyIG1heW9yIHF1ZSAlcy5cIixcbiAgcmFuZ2U6ICAgICAgICAgIFwiRXN0ZSB2YWxvciBkZWJlIGVzdGFyIGVudHJlICVzIHkgJXMuXCIsXG4gIG1pbmxlbmd0aDogICAgICBcIkVzdGUgdmFsb3IgZXMgbXV5IGNvcnRvLiBMYSBsb25naXR1ZCBtw61uaW1hIGVzIGRlICVzIGNhcmFjdGVyZXMuXCIsXG4gIG1heGxlbmd0aDogICAgICBcIkVzdGUgdmFsb3IgZXMgbXV5IGxhcmdvLiBMYSBsb25naXR1ZCBtw6F4aW1hIGVzIGRlICVzIGNhcmFjdGVyZXMuXCIsXG4gIGxlbmd0aDogICAgICAgICBcIkxhIGxvbmdpdHVkIGRlIGVzdGUgdmFsb3IgZGViZSBlc3RhciBlbnRyZSAlcyB5ICVzIGNhcmFjdGVyZXMuXCIsXG4gIG1pbmNoZWNrOiAgICAgICBcIkRlYmUgc2VsZWNjaW9uYXIgYWwgbWVub3MgJXMgb3BjaW9uZXMuXCIsXG4gIG1heGNoZWNrOiAgICAgICBcIkRlYmUgc2VsZWNjaW9uYXIgJXMgb3BjaW9uZXMgbyBtZW5vcy5cIixcbiAgY2hlY2s6ICAgICAgICAgIFwiRGViZSBzZWxlY2Npb25hciBlbnRyZSAlcyB5ICVzIG9wY2lvbmVzLlwiLFxuICBlcXVhbHRvOiAgICAgICAgXCJFc3RlIHZhbG9yIGRlYmUgc2VyIGlkw6ludGljby5cIlxufSk7XG5cblBhcnNsZXkuc2V0TG9jYWxlKCdlcycpO1xuIl0sImZpbGUiOiJ2ZW5kb3IvcGFyc2xleS9lcy5qcyJ9
