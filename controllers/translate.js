import {translate} from 'free-translate'
import { isPersian, toPersianChars } from "persian-tools2";

export const Translate = async (req,res)=>{
    const text = req.body.desc;
        try{
        if(!isPersian(text)){
        const translatedText = await translate(text, { to: 'fa' });
        res.status(200).json(translatedText)}
        if(isPersian(text)){
            const translatedText = await translate(text, { to: 'en' });
        res.status(200).json(translatedText)}
        }
        catch(err){
        res.status(500).json(err)
        }
}