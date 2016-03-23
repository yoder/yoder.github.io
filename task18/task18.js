(function() {
    /*
     * getElementById简写
     */
    function $(id, doc) {
        doc = doc || document;
        return (id.charAt(0) === '#' ? doc.getElementById(id.substr(1)) : doc.getElementsByTagName(id));
    };
    /*
     * 原形扩展的方式去除字符串两头空格及中间空白
     */
    String.prototype.trim = function() {
        return this.replace(/[(^\s+)(\s+$)]/g, "")
    };
    /*
     * 缓存dom
     */
    var dom = {
        input: $('#txtKey'), //输入框
        lin: $('#btnLIn'), //左侧入
        rin: $('#btnRIn'), //右侧入
        lout: $('#btnLOut'), //左侧出
        rout: $('#btnROut'), //右侧出
        rows: $('#main-rows') //显示框
    };
    /*
     * 左侧入
     */
    dom.lin.addEventListener('click', function() {
        insert('unshift')
    });
    /*
     * 右侧入
     */
    dom.rin.addEventListener('click', function() {
        insert('push')
    });
    /*
     * 左侧出
     */
    dom.lout.addEventListener('click', function() {
        sequence.shift()
    });
    /*
     * 右侧出
     */
    dom.rout.addEventListener('click', function() {
        sequence.pop()
    });
    /*
     * 插入
     */
    function insert(type) {
        var val = dom.input.value.trim();
        if (/^\d+$/.test(val)) {
            dom.input.value = '';
            dom.input.focus();
            switch (type) {
                case 'unshift':
                    sequence.unshift(val);
                    break;
                case 'push':
                    sequence.push(val);
                    break;
                default:
                    alert('未知操作!');
                    break
            }
        } else {
            alert('请输入整数!');
            dom.input.focus()
        }
    };
    //序列
    var sequence = {
        //数据
        data: [],
        //右侧入
        push: function(number) {
            sequence.data.push(number);
            sequence.render();
        },
        //左侧入
        unshift: function(number) {
            sequence.data.unshift(number);
            sequence.render()
        },
        //左侧出
        shift: function() {
            if (sequence.data.length > 0) {
                alert(sequence.data.shift());
                sequence.render()
            }
        },
        //右侧出
        pop: function() {
            if (sequence.data.length > 0) {
                alert(sequence.data.pop());
                sequence.render()
            }
        },
        //删除
        remove: function(index) {
            sequence.data.splice(index, 1);
            sequence.render()
        },
        //渲染
        render: function() {
            var html = [];
            var len = sequence.data.length;
            for (var i = 0; i < len; i++) {
                html.push('<span>' + sequence.data[i] + '</span>');
            };
            dom.rows.innerHTML = html.join('');
            sequence.bindEvent()
        },
        //绑定事件
        bindEvent: function() {
            var objs = $('span', dom.rows);
            var len = objs.length;
            for (var i = 0; i < len; i++) {
                (function(m) {
                    objs[m].addEventListener('click', function() {
                        sequence.remove(m)
                    })
                })(i)
            }
        }
    };
})()