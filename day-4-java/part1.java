import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

class Card {
    public int[] winningNumbers;
    public int[] numbers;
    public int winningCount;
    public int points;

    public Card(String[] winningNumbers, String[] numbers) {
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
        this.points = calculatePoints();
    }

    private int[] parseNumbers(String[] numbers) {
        int[] newNumbers = new int[numbers.length];

        for (int i = 0; i < numbers.length; i++) {
            newNumbers[i] = Integer.parseInt(numbers[i]);
        }
        return newNumbers;
    }

    private int calculatePoints() {
        if (this.winningCount == 0)
            return 0;
        return (int) Math.pow(2.0, (double) this.winningCount - 1.0);
    }
}

class part1 {

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

        int total = 0;

        for (Card card : cards) {
            total += card.points;
        }
        System.out.println(total);

    }
}