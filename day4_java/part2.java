import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

class Card {
    public int[] winningNumbers;
    public int[] numbers;
    public int winningCount;
    public long instance;

    public Card(String[] winningNumbers, String[] numbers) {
        this.instance = 1;
        this.winningNumbers = parseNumbers(winningNumbers);
        this.numbers = parseNumbers(numbers);

        int total = 0;
        for (int i : this.numbers) {
            for (int j : this.winningNumbers) {
                if (i == j)
                    total += 1;
            }
        }
        this.winningCount = total;
    }

    private int[] parseNumbers(String[] numbers) {
        int[] newNumbers = new int[numbers.length];

        for (int i = 0; i < numbers.length; i++) {
            newNumbers[i] = Integer.parseInt(numbers[i]);
        }
        return newNumbers;
    }

    public void winCopyOfCard(long number) {
        this.instance += number;
    }

}

class part2 {

    public static void main(String[] args) {

        ArrayList<Card> cards = new ArrayList<Card>();

        try {
            File myObj = new File("input1.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String line = myReader.nextLine();
                System.out.println(line);

                String matches = line.split(":( +)")[1];
                String winnings = matches.split("( +)\\|( +)")[0];
                String numbers = matches.split("( +)\\|( +)")[1];

                String[] winning_numbers = winnings.split("( +)");
                String[] current_numbers = numbers.split("( +)");

                Card card = new Card(winning_numbers, current_numbers);
                cards.add(card);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        for (int index = 0; index < cards.size(); index++) {
            Card currentCard = cards.get(index);
            int count = currentCard.winningCount;

            System.out.println("Card: " + index + ", instance: " + currentCard.instance + ", winning_count: "
                    + currentCard.winningCount);
            for (int i = 0; i < count; i++) {
                cards.get(index + i + 1).winCopyOfCard(currentCard.instance);
                System.out.println("Card: " + (index + i) + ", instance: " + cards.get(index + 1).instance);

            }
        }

        long total = 0;

        for (Card card : cards) {
            total += card.instance;
        }
        System.out.println(total);
    }
}