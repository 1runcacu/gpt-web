<template>
    <div class="MSG" :class="{'LYOUT':uid===uuid}">
        <img v-if="uid===uuid" src="/user.png"/>
        <img v-if="uid!==uuid" src="/icon.svg"/>
        <div class="ctx" :class="{'user':uid===uuid}">
            <b>{{uid}}</b>
            <div class="message-right box" contenteditable="false"
            v-if="uid===uuid">{{ message }}</div>
            <div class="message-left box" contenteditable="false"
            v-if="uid!==uuid">{{ message }}</div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    message:String,
    uid:String,
    uuid:String,
    width:Number,
});

</script>

<style scoped>
.MSG{
    max-width: calc(100% - 20px);
    display: flex;
    align-items: flex-start;
    /* flex-direction: row-reverse; */
    padding: 10px;
}

.LYOUT{
    flex-direction: row-reverse;
}

.MSG>img{
    width: 30px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 1rem;
}
.MSG>.ctx{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    user-select: text;
    margin: 3px;
    overflow-x: hidden;
    padding: 2px;
}

.MSG>.user{
    align-items: flex-end !important;
}

.message-right{
    border-radius:  10px 0 10px 10px;
    padding: 5px;
    box-shadow: 0px 0px 5px #55A8FD;
    background-color: #55A8FD;
    word-wrap:break-word;
    overflow: hidden;
    min-height: 30px;
}

.message-left{
    border-radius: 0 10px 10px 10px;
    padding: 5px;
    box-shadow: 0px 0px 5px #635a5a;
    background-color: #FFFFFF;
    margin-right: 40px;
    word-wrap:break-word;
    overflow: hidden;
    min-height: 30px;
}

.box{
    resize: none;
    white-space: pre-wrap; word-break:break-all;
    overflow: hidden;
    max-width: calc(100% - 40px);
}


</style>