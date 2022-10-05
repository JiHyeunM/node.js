const express = require("express");
const router = express.Router(); // 
const Post = require("../schemas/post")                   


// 게시글 작성
router.post("/", async (req,res)=>{ // post메서드 사용 /로 보냄


    
    // const abc = req.body.user
    // const {title} = req.body    구조분해할당
    // const {password} = req.body
    // const {content} = req.body

    const {user, title , password, content } = req.body; // 구조 분해 할당 / 변수값과 키값이 중복이다 / 클라이언트에서 입력한 정보들이 req.body에 저장돼있음
    console.log({user, title, password, content});
    const createdAt = new Date(); // schemas에 저장돼있지 않은 정보를 새로 선언?
    await Post.create({user, title, password, content, createdAt}); // 디비를 생성하는 함수.create 디비에 있는 post라는 컬렉션에 저것들을 만들어라
    // await 디비에 관련된 것을 할 때 써줌 이거 먼저 끝내고 갈 거다?

    res.json({
        msg : "게시글을 생성하였습니다"
    })
})

// 게시글 목록 조회
router.get("/", async(req,res)=>{ // 라우터는 위에서 아래로 읽음? 
    const posts = await Post.find().sort("-createdAt"); // 1. 디비에서 데이터를 가져와서 작성 날짜 기준 내림차순
    const post = posts.map((item) => {
        return {
            postId : item._id,
            user : item.user,
            title : item.title,
            createdAt : item.createdAt
        }
    })
    // 가져온 데이터 posts에서 제목 작성자명 날짜만 가져와서 새 배열로 만듬(map())
    res.json({data:post})
})

// 게시글 상세조회
router.get("/:_postId", async(req,res)=>{ // 라우터는 위에서 아래로 읽음? 
    const { _postId } = req.params //url뒤에 id값을 파라미터로 받아옴 주소 뒤에 어떤 데이터를 담아주는 걸 파라미터 
    const posts = await Post.findOne({_id:_postId}) // 디비 필드값 : 내가 넣어주는 값
    const post = {
        postId : posts._id,
        user : posts.user,
        title : posts.title,
        content : posts.content,
        createdAt : posts.createdAt
    }
    console.log(posts)
    res.json({post})
})

// 게시글 수정
router.put("/:_postId", async(req,res)=>{
    // 파라미터에서 postId 값을 같은 변수 이름으로 구조분해 할당으로 갖고 온다
    const { _postId } = req.params
    // body에서 password, title, content 값을 같은 변수 이름으로 구조분해 할당으로 갖고 온다
    const {password, title, content} = req.body
    // 디비에 저장된 _id값을 찾아와 posts라는 변수에 할당
    const posts = await Post.findOne({_id:_postId})
    // 만약 디비에 저장된 패스워드와 내가 입력한 패스워드가 일치하면
    if(posts.password == password){
        // 디비에 (구조분해 할당으로 갖고 온)title과 content 값을 update 할 수 있게 함
        await Post.updateOne({_id:_postId}, {$set:{title,content}})
        // 수정이 되면 201번으로 제이슨 형태로 msg를 보낸다
        return res.status(201).json({msg : "게시글을 수정하였습니다"})
    // 패스워드가 일치하지 않으면
    }else{
        // 400번으로 띄운다,,? 에러 json형태로 아래것들을 보낸다 
        return res.status(400).json({
            // 실패했다
            success : false,
            msg : "비밀번호가 일치하지 않습니다"
        })
    }
})

//게시글 삭제
// 특정 유저 아이디 검증
router.delete("/:_postId", async(req,res)=>{
    // 파라미터에서 postId 값을 같은 변수 이름으로 구조분해 할당으로 갖고 온다
    const { _postId } = req.params
    const {password} = req.body
    // 디비에 저장된 _id값을 찾아와 posts라는 변수에 할당
    const posts = await Post.findOne({_id:_postId})
    if(posts.password == password){
        // 디비에 (구조분해 할당으로 갖고 온)title과 content 값을 update 할 수 있게 함
        await Post.deleteOne({_id:_postId})
        // 삭제가 되면 201번으로 제이슨 형태로 msg를 보낸다
        return res.status(201).json({msg : "게시글을 삭제하였습니다"})
    // 패스워드가 일치하지 않으면
    }else{
        // 400번으로 띄운다,,? 에러 json형태로 아래것들을 보낸다 
        return res.status(400).json({
            // 실패했다
            success : false,
            msg : "비밀번호가 일치하지 않습니다"
        })
    }
})


module.exports = router
