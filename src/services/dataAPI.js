'use client'



export async function homePageData(language){
    try {
    const response = await fetch(`https://saavn.me/modules?language=${language.toString()}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }

}