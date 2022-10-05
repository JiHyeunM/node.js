// API 댓글 조회, 작성, 수정, 삭제
const express = require("express");
const router = express.Router();
const Comm = require("../schemas/comment")


//댓글 생성
router.post("/:_postId", async(req,res)=>{
    const {_postId} =  req.params;
    const { user, password, content } = req.body;
    // console.log({user, password, content});
    const createdAt = new Date();
    
    // 댓글 내용이 없을 때 content가 비었을 경우
    if(content == ""){res.json({mag : "댓글 내용을 입력해 주세요"})}
    else{
        await Comm.create({ _postId,user, password, content, createdAt});
        res.json({mag : "댓글을 생성하였습니다"})
    }
})

// 댓글 목록 조회
router.get("/:_postId", async(req, res)=>{
    const comments = await Comm.find().sort("-createdAt");
    const comment = comments.map((item)=>{
        return{
            commentId : item._id,
            user : item.user,
            content : item.content,
            createdAt : item.createdAt
        }
    })
    res.json({data:comment})
})

// 댓글 수정
router.put("/:_commentId", async(req,res)=>{
    const {_postId } = req.params
    const { password, content } = req.body
    const comment = await Comm.findOne({_id:_postId})
    if(content == ""){res.json({msg : "댓글 내용을 입력해 주세요"})}
    else if(comment.password == password){
        await Comm.updateOne({_id:_postId}, {$set:{content}})
        return res.status(201).json({msg : "댓글을 수정하였습니다"})
    }else{
        return res.status(400).json({
            success : false,
            msg : "비밀번호가 일치하지 않습니다"
        })
    }
})

// 댓글 삭제
router.delete("/:_commentId", async(req,res)=>{
    const {_postId } = req.params
    const {password} = req.body
    const comment = await Comm.findOne({_id:_postId})
    if(comment.password == password){
        await Comm.deleteOne({_id:_postId})
        return res.status(201).json({msg:"댓글을 삭제하였습니다"})
    }else{
        return res.status(400).json({
            success : false,
            msg:"비밀번호가 일치하지 않습니다"
        })
    }
})



module.exports = router