var itemUrl="https://awiclass.monoame.com/api/command.php?type=get&name=itemdata";

var shopList={};

shopList.name="阿瑜的購物清單";
shopList.time="2022/03/19"
shopList.list=[
    {
        name: "吹風機",
        price:300
    },
    {
        name: "麥克筆",
        price:5000
    },
    {
        name: "筆記型電腦",
        price:35000
    },
    {
        name: "iPhone",
        price:32000
    },
    {
        name: "神奇海螺",
        price:5000
    }
];

// $.ajax({
//     url:itemUrl,
//     success:function(res){
//         shopList.list=JSON.parse(res);
//         showList();
//     }
// })

var itemHtml="<li id={{id}} class='buy-item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{delId}} data-del-id={{data-delId}} class='del-btn'>X</div></li>"
var itemTotal="<li class='buy-item total'>總價<div class='price'>{{price}}</div></li>"

function showList(){
    $('#items-list').html("");

    var totalPrice=0;

    for(var i=0;i<shopList.list.length;i++){
        var item=shopList.list[i];
        var itemId="buy-item-"+i;
        var del_ItemId="del-buyitem-"+i;
        totalPrice += parseInt(item.price);

            var current_itemHtml=
            itemHtml.replace('{{num}}',i+1)
                    .replace('{{item}}',item.name)
                    .replace('{{id}}',itemId)
                    .replace('{{price}}',item.price)
                    .replace('{{delId}}',del_ItemId)
                    .replace('{{data-delId}}',i)

            $('#items-list').append(current_itemHtml);
            $("#"+itemId).children('.del-btn').click(
                function(){
                    removeItem($(this).attr("data-del-id"));
                }
            )
        }
    var current_itemTotal=
    itemTotal.replace('{{price}}',totalPrice)
    $('#items-list').append(current_itemTotal);
}
showList();
$(".add-btn").click(
    function(){
        shopList.list.push(
            {
                name:$("#input-name").val(),
                price:$("#input-price").val()
            }
        );
        $("#input-name").val("");
        $("#input-price").val("");
        showList();
    }
);

function removeItem(id){
    shopList.list.splice(id,1);
    showList();
}

