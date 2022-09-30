/*! Select2 4.0.7 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/th",[],function(){return{errorLoading:function(){return"ไม่สามารถค้นข้อมูลได้"},inputTooLong:function(e){var t=e.input.length-e.maximum,n="โปรดลบออก "+t+" ตัวอักษร";return n},inputTooShort:function(e){var t=e.minimum-e.input.length,n="โปรดพิมพ์เพิ่มอีก "+t+" ตัวอักษร";return n},loadingMore:function(){return"กำลังค้นข้อมูลเพิ่ม…"},maximumSelected:function(e){var t="คุณสามารถเลือกได้ไม่เกิน "+e.maximum+" รายการ";return t},noResults:function(){return"ไม่พบข้อมูล"},searching:function(){return"กำลังค้นข้อมูล…"},removeAllItems:function(){return"ลบรายการทั้งหมด"}}}),{define:e.define,require:e.require}})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3Ivc2VsZWN0Mi00LjAuNy9pMThuL3RoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBTZWxlY3QyIDQuMC43IHwgaHR0cHM6Ly9naXRodWIuY29tL3NlbGVjdDIvc2VsZWN0Mi9ibG9iL21hc3Rlci9MSUNFTlNFLm1kICovXG5cbihmdW5jdGlvbigpe2lmKGpRdWVyeSYmalF1ZXJ5LmZuJiZqUXVlcnkuZm4uc2VsZWN0MiYmalF1ZXJ5LmZuLnNlbGVjdDIuYW1kKXZhciBlPWpRdWVyeS5mbi5zZWxlY3QyLmFtZDtyZXR1cm4gZS5kZWZpbmUoXCJzZWxlY3QyL2kxOG4vdGhcIixbXSxmdW5jdGlvbigpe3JldHVybntlcnJvckxvYWRpbmc6ZnVuY3Rpb24oKXtyZXR1cm5cIuC5hOC4oeC5iOC4quC4suC4oeC4suC4o+C4luC4hOC5ieC4meC4guC5ieC4reC4oeC4ueC4peC5hOC4lOC5iVwifSxpbnB1dFRvb0xvbmc6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5pbnB1dC5sZW5ndGgtZS5tYXhpbXVtLG49XCLguYLguJvguKPguJTguKXguJrguK3guK3guIEgXCIrdCtcIiDguJXguLHguKfguK3guLHguIHguKnguKNcIjtyZXR1cm4gbn0saW5wdXRUb29TaG9ydDpmdW5jdGlvbihlKXt2YXIgdD1lLm1pbmltdW0tZS5pbnB1dC5sZW5ndGgsbj1cIuC5guC4m+C4o+C4lOC4nuC4tOC4oeC4nuC5jOC5gOC4nuC4tOC5iOC4oeC4reC4teC4gSBcIit0K1wiIOC4leC4seC4p+C4reC4seC4geC4qeC4o1wiO3JldHVybiBufSxsb2FkaW5nTW9yZTpmdW5jdGlvbigpe3JldHVyblwi4LiB4Liz4Lil4Lix4LiH4LiE4LmJ4LiZ4LiC4LmJ4Lit4Lih4Li54Lil4LmA4Lie4Li04LmI4Lih4oCmXCJ9LG1heGltdW1TZWxlY3RlZDpmdW5jdGlvbihlKXt2YXIgdD1cIuC4hOC4uOC4k+C4quC4suC4oeC4suC4o+C4luC5gOC4peC4t+C4reC4geC5hOC4lOC5ieC5hOC4oeC5iOC5gOC4geC4tOC4mSBcIitlLm1heGltdW0rXCIg4Lij4Liy4Lii4LiB4Liy4LijXCI7cmV0dXJuIHR9LG5vUmVzdWx0czpmdW5jdGlvbigpe3JldHVyblwi4LmE4Lih4LmI4Lie4Lia4LiC4LmJ4Lit4Lih4Li54LilXCJ9LHNlYXJjaGluZzpmdW5jdGlvbigpe3JldHVyblwi4LiB4Liz4Lil4Lix4LiH4LiE4LmJ4LiZ4LiC4LmJ4Lit4Lih4Li54Lil4oCmXCJ9LHJlbW92ZUFsbEl0ZW1zOmZ1bmN0aW9uKCl7cmV0dXJuXCLguKXguJrguKPguLLguKLguIHguLLguKPguJfguLHguYnguIfguKvguKHguJRcIn19fSkse2RlZmluZTplLmRlZmluZSxyZXF1aXJlOmUucmVxdWlyZX19KSgpOyJdLCJmaWxlIjoidmVuZG9yL3NlbGVjdDItNC4wLjcvaTE4bi90aC5qcyJ9