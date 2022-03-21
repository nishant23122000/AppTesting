import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IJobContext } from '@rocket.chat/apps-engine/definition/scheduler';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUIKitInteractionHandler, IUIKitResponse, UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { IUIKitBlockIncomingInteraction } from '@rocket.chat/apps-engine/definition/uikit/UIKitIncomingInteractionTypes';
import { OpenDialogCommand } from './commands/OpenDialogCommand';

export class AppDialogApp extends App  {
    private readonly appLogger: ILogger
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        this.appLogger = this.getLogger()
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new OpenDialogCommand(this));
        await configuration.scheduler.registerProcessors([
            {
                id:'timer',
                processor:async ({modify,context}:{modify:IModify,context:SlashCommandContext})=>{

                    // const room=context.getRoom();
                    // const send=await modify.getCreator().startMessage().setText("helghjhlo click").setRoom(room);
                    // await modify.getCreator().finish(send);
                }
                    
               
            },
           
        ]);
    }

    // public async executeBlockActionHandler(context:UIKitBlockInteractionContext,read:IRead,http:IHttp,persistance:IPersistence,modify:IModify):Promise<IUIKitResponse>{
    //     const data=context.getInteractionData();
    //     const {actionId}=data;
  
    //     if(actionId=='create'){
    //         const {room}=context.getInteractionData();
    //         const send=await modify.getCreator().startMessage().setText("hello click");
    //         await modify.getCreator().finish(send);
    //         if(room){
    //             send.setRoom(room);
    //         }
    //         return {
    //             success:true
    //         }
        
    //     }
    //     return {
    //         success:true
    //     }
    // }

    
}
