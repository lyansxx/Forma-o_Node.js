const Player1 = {
    NOME: "MARIO",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const Player2 = {
    NOME: "LUIGI",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;


}
async function getRandomBlock() {
    let random = Math.random()
    let resultado
    switch (true) {
        case random < 0.33:
            resultado = "RETA";
            break;
        case random < 0.66:
            resultado = "CURVA";
            break;
        default:
            resultado = "CONFRONTO";

    }
    return resultado
}
async function logRollResult(characterName, block, diceResult, atribute) {
    console.log(`${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)

}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} `)

        // Sortear Bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);

        // Rolar Dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // Teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            console.log(`${character1.NOME} Confrontou com ${character2.NOME}!🥊`)

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} Venceu o confronto! ${character2.NOME} perdeu um ponto`)
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} Venceu o confronto! ${character1.NOME} perdeu um ponto`)

                character1.PONTOS--;
            }


            console.log(powerResult1 === powerResult2 ? "Confronto empatado, Nenhum ponto foi perdido " : "");
        }

        // Verificando o vencedor 

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} Marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} Marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("-------------------------------------------------")
    }

}

async function declareWinner(character1, character2) {
        console.log("Resultado Final:")
        console.log(`${character1.NOME} ${character1.PONTOS} ponto(s)`);
        console.log(`${character2.NOME} ${character2.PONTOS} ponto(s)`);

        if(character1.PONTOS > character2.PONTOS){
            console.log(`\n${character1.NOME} venceu a corrida! parabéns! 🏆`);
        }

        else if (character2.PONTOS > character1.PONTOS){
             console.log(`\n${character2.NOME} venceu a corrida! parabéns! 🏆`);
        }
        else{
            console.log("A corrida terminou em empate");
        }
        
    }

(async function main() {
    console.log(`🏁🚨 Corrida entre ${Player1.NOME} e ${Player2.NOME} começando...`);
    await playRaceEngine(Player1, Player2);
    await declareWinner(Player1, Player2);
})();