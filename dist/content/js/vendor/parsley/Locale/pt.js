// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('pt-br', {
  defaultMessage: "Este valor parece ser inválido.",
  type: {
    email:        "Este campo deve ser um email válido.",
    url:          "Este campo deve ser um URL válida.",
    number:       "Este campo deve ser um número válido.",
    integer:      "Este campo deve ser um inteiro válido.",
    digits:       "Este campo deve conter apenas dígitos.",
    alphanum:     "Este campo deve ser alfa numérico."
  },
  notblank:       "Este campo não pode ficar vazio.",
  required:       "Este campo é obrigatório.",
  pattern:        "Este campo parece estar inválido.",
  min:            "Este campo deve ser maior ou igual a %s.",
  max:            "Este campo deve ser menor ou igual a %s.",
  range:          "Este campo deve estar entre %s e %s.",
  minlength:      "Este campo é pequeno demais. Ele deveria ter %s caracteres ou mais.",
  maxlength:      "Este campo é grande demais. Ele deveria ter %s caracteres ou menos.",
  length:         "O tamanho deste campo é inválido. Ele deveria ter entre %s e %s caracteres.",
  mincheck:       "Você deve escolher pelo menos %s opções.",
  maxcheck:       "Você deve escolher %s opções ou mais",
  check:          "Você deve escolher entre %s e %s opções.",
  equalto:        "Este valor deveria ser igual."
});

Parsley.setLocale('pt-br');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvcGFyc2xleS9Mb2NhbGUvcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVmFsaWRhdGlvbiBlcnJvcnMgbWVzc2FnZXMgZm9yIFBhcnNsZXlcbi8vIExvYWQgdGhpcyBhZnRlciBQYXJzbGV5XG5cblBhcnNsZXkuYWRkTWVzc2FnZXMoJ3B0LWJyJywge1xuICBkZWZhdWx0TWVzc2FnZTogXCJFc3RlIHZhbG9yIHBhcmVjZSBzZXIgaW52w6FsaWRvLlwiLFxuICB0eXBlOiB7XG4gICAgZW1haWw6ICAgICAgICBcIkVzdGUgY2FtcG8gZGV2ZSBzZXIgdW0gZW1haWwgdsOhbGlkby5cIixcbiAgICB1cmw6ICAgICAgICAgIFwiRXN0ZSBjYW1wbyBkZXZlIHNlciB1bSBVUkwgdsOhbGlkYS5cIixcbiAgICBudW1iZXI6ICAgICAgIFwiRXN0ZSBjYW1wbyBkZXZlIHNlciB1bSBuw7ptZXJvIHbDoWxpZG8uXCIsXG4gICAgaW50ZWdlcjogICAgICBcIkVzdGUgY2FtcG8gZGV2ZSBzZXIgdW0gaW50ZWlybyB2w6FsaWRvLlwiLFxuICAgIGRpZ2l0czogICAgICAgXCJFc3RlIGNhbXBvIGRldmUgY29udGVyIGFwZW5hcyBkw61naXRvcy5cIixcbiAgICBhbHBoYW51bTogICAgIFwiRXN0ZSBjYW1wbyBkZXZlIHNlciBhbGZhIG51bcOpcmljby5cIlxuICB9LFxuICBub3RibGFuazogICAgICAgXCJFc3RlIGNhbXBvIG7Do28gcG9kZSBmaWNhciB2YXppby5cIixcbiAgcmVxdWlyZWQ6ICAgICAgIFwiRXN0ZSBjYW1wbyDDqSBvYnJpZ2F0w7NyaW8uXCIsXG4gIHBhdHRlcm46ICAgICAgICBcIkVzdGUgY2FtcG8gcGFyZWNlIGVzdGFyIGludsOhbGlkby5cIixcbiAgbWluOiAgICAgICAgICAgIFwiRXN0ZSBjYW1wbyBkZXZlIHNlciBtYWlvciBvdSBpZ3VhbCBhICVzLlwiLFxuICBtYXg6ICAgICAgICAgICAgXCJFc3RlIGNhbXBvIGRldmUgc2VyIG1lbm9yIG91IGlndWFsIGEgJXMuXCIsXG4gIHJhbmdlOiAgICAgICAgICBcIkVzdGUgY2FtcG8gZGV2ZSBlc3RhciBlbnRyZSAlcyBlICVzLlwiLFxuICBtaW5sZW5ndGg6ICAgICAgXCJFc3RlIGNhbXBvIMOpIHBlcXVlbm8gZGVtYWlzLiBFbGUgZGV2ZXJpYSB0ZXIgJXMgY2FyYWN0ZXJlcyBvdSBtYWlzLlwiLFxuICBtYXhsZW5ndGg6ICAgICAgXCJFc3RlIGNhbXBvIMOpIGdyYW5kZSBkZW1haXMuIEVsZSBkZXZlcmlhIHRlciAlcyBjYXJhY3RlcmVzIG91IG1lbm9zLlwiLFxuICBsZW5ndGg6ICAgICAgICAgXCJPIHRhbWFuaG8gZGVzdGUgY2FtcG8gw6kgaW52w6FsaWRvLiBFbGUgZGV2ZXJpYSB0ZXIgZW50cmUgJXMgZSAlcyBjYXJhY3RlcmVzLlwiLFxuICBtaW5jaGVjazogICAgICAgXCJWb2PDqiBkZXZlIGVzY29saGVyIHBlbG8gbWVub3MgJXMgb3DDp8O1ZXMuXCIsXG4gIG1heGNoZWNrOiAgICAgICBcIlZvY8OqIGRldmUgZXNjb2xoZXIgJXMgb3DDp8O1ZXMgb3UgbWFpc1wiLFxuICBjaGVjazogICAgICAgICAgXCJWb2PDqiBkZXZlIGVzY29saGVyIGVudHJlICVzIGUgJXMgb3DDp8O1ZXMuXCIsXG4gIGVxdWFsdG86ICAgICAgICBcIkVzdGUgdmFsb3IgZGV2ZXJpYSBzZXIgaWd1YWwuXCJcbn0pO1xuXG5QYXJzbGV5LnNldExvY2FsZSgncHQtYnInKTsiXSwiZmlsZSI6InZlbmRvci9wYXJzbGV5L0xvY2FsZS9wdC5qcyJ9
