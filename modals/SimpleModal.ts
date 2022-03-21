import { IModify, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { TextObjectType, UIKitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";



export async function SimpleModal({modify,read,persistance,slashCommandContext,uikitcontext}:{modify:IModify,read:IRead,persistance:IPersistence,slashCommandContext:SlashCommandContext,uikitcontext?:UIKitInteractionContext}):Promise<IUIKitModalViewParam> {

    const viewId="modal";
    const block=modify.getCreator().getBlockBuilder();

    const room=slashCommandContext?.getRoom() || uikitcontext?.getInteractionData().room;
    const user = slashCommandContext?.getSender() || uikitcontext?.getInteractionData().user;

    block.addSectionBlock({
        text:{text:"my task is cmplete",type:TextObjectType.PLAINTEXT},
        accessory:block.newOverflowMenuElement({
            actionId:"overflow",
            options:[
                {text:{text:"clck me",type:TextObjectType.PLAINTEXT},value:"sdgfsdgfg"},
                {text:{text:"clck sdfgme",type:TextObjectType.PLAINTEXT},value:"sdgsdgfsffsdgfg"},
                {text:{text:"clcdgfk me",type:TextObjectType.PLAINTEXT},value:"sdggdfgfgsdfgffsdgfg"},
            ]
        })
        // accessory:block.newButtonElement({
        //     actionId:"add",
        //     text:{
        //         text:"submit",
        //         type:TextObjectType.PLAINTEXT
        //     },
        //     value:"close that"
        // })
    })

    block.addInputBlock({
        blockId:"input",
        label:{text:"Enter the task name",type:TextObjectType.PLAINTEXT},
        element:block.newPlainTextInputElement({
            actionId:"task_input",
            placeholder:{text:"enter",type:TextObjectType.PLAINTEXT},
            initialValue:"enter"
        })
    })
    block.addActionsBlock({
        elements:[
            block.newButtonElement({
                actionId:"create",
                text:{text:"add task",type:TextObjectType.PLAINTEXT},
                value:"Nishant"
            })
        ]
    })
    return {
        id:viewId,
        title:{
            type:TextObjectType.PLAINTEXT,
            text:"My modal"
        },
        blocks:block.getBlocks()
    }
    
}