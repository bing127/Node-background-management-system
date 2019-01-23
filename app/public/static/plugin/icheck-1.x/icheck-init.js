$(function () {
    {% if cookie.theme.value==null %}
    var str = 'icheckbox_square-blue'
    {% else %}
    var str = 'icheckbox_square-{{ cookie.theme.value }}'
    {% endif %}
    $('input.i-checks').iCheck({
        checkboxClass:str,
        radioClass: str,
        increaseArea: '20%' // optional
    });
});
