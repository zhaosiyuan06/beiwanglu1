    var app=angular.module('todo',[]);
    //交互
    app.directive('listCase',[function(){
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:"<ul><div ng-transclude></div></ul>",
            link:function(scope,el){
                $(el).on('mousedown',"li",false);
                $(el).on('click',"li",function(){
                    $('.left').find('li').removeClass('back dianji');
                    $(this).addClass('back');
                })
                $(el).on('dblclick',"li",function(){
                    $(this).addClass('dianji');
                    var input= $(this).find('input');
                    input.val(input.val()).focus();
                })
                $(el).find('li input').on('blur',function(){
                    $(this).closest('li').removeClass('dianji');
                })
                //删除
                $(el).on('keyup','li',false);
                $(document).on('keyup',function(e){
                    if(e.keyCode==46){
                        var id=parseInt($(el).find('.back').attr('data-id'));
                        scope.$apply(function(){
                            scope.nates=scope.nates.filter(function(v,i){
                                return v.id!==id;
                            })
                        })
                    }
                })
            }
        }
    }])
    app.directive('optionList',[function(){
        return{
            restrict:'AE',
            replace:true,
            transclude:true,
            template:"<div class='info'><div ng-transclude></div></div>",
            link:function(scope,el){
                scope.colors=["red","blue","yellow","green","tu","zi","orange"];
                $('.xuan').on('click',false)
                $('.xuan').on('click',function(){
                    $(el).toggle();
                })
                $('.info').on('click',false);
                $(document).on('click',function(){
                    $('.info').hide();
                })
                $('.res').on('click',false)
                $('.res').on('click',function(){
                    $('.info').hide();
                });
                $('.uls').on('click',"li",false)
                $('.uls').on('click',"li",function(){
                    $('.uls li').removeClass("ss");
                    $(this).addClass("ss");
                    $('.shanchu').css({display:"none"})
                    $(this).find('.shanchu').css({display:"block"})
                })
               
                $('.sanjiao').on('click',function(){
                    $(this).toggleClass('sanjiao1')
                })
               $('.shang ul ').on('click','.liss',function(){
                   scope.colors.forEach(function(v,i){
                       $('.shang ul .liss').removeClass(v);
                   })
                   $(this).addClass(scope.current.theme);
               })
                $('.clear').on('click',function(){
                    $('.a').remove();
                })
            }
        }
    }])
    app.controller('mainCtrl',['$scope',function($scope){
        $scope.colors=["red","blue","yellow","green","tu","zi","orange"];
        $scope.nates=[
            {id:1001,theme:"red",title:"新列表1",todos:[
                {id:1, title:'maifang', states:1},
                {id:2, title:'maicai', states:1},
                {id:3, title:'maiche', states:0},
                {id:4, title:'maihytttt', states:0},
            ]}]
        $scope.tianjia=function(){
            var max_id=0;
            $scope.nates.forEach(function(v,i){
                if(max_id<v.id){
                    max_id=v.id;
                }
            })
            var id=max_id+1;
            var item={
                id:id,
                title:"新列表"+($scope.nates.length+1),
                theme:$scope.colors[$scope.nates.length%7],
                todos:[]
            }
            $scope.nates.push(item)
        }
        $scope.current=$scope.nates[0];
        $scope.setcurrent=function(v){
            $scope.current=v;
        }
        $scope.delete1=function(id){
            $scope.current.todos= $scope.current.todos.filter(function(v,i){
                return v.id !== id;
                // console.log(id)
            })
        }
        $scope.addtodos=function(e){
            if(e.keyCode===13){
                var max_id=-Infinity;
                $scope.current.todos.forEach(function(v,i){
                    if(max_id<v.id){
                        max_id=v.id;
                    }
                })
                var id=max_id+1;
                var item={
                    id:id,
                    title:$('.inputt').val(),
                    states:0,
                }
                $scope.current.todos.push(item)
                $('.inputt').val("")
            }
        }
        // scope.addcircle=function(){
        //     $('')
        // }

    } ])

