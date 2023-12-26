using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;

namespace Day5
{

    class Map
    {
        List<Range> ranges;
        // Dictionary<long, long> map;

        public Map(List<Range> ranges)
        {
            this.ranges = ranges;
            // this.map = calculateMap();
        }

        public long GetDestination(long source)
        {
            foreach (Range range in this.ranges)
            {
                if (source >= range.destination && source < range.destination + range.length) return source - range.destination + range.source;
            }

            return source;
        }

        public void Print()
        {
            foreach (Range range in this.ranges)
            {
                range.Print();
            }
        }
    }
    class Range
    {
        public long source;
        public long destination;
        public long length;

        public Range(long[] numbers)
        {
            this.source = numbers[0];
            this.destination = numbers[1];
            this.length = numbers[2];
        }

        public void Print()
        {
            Console.WriteLine(this.source + " " + this.destination + " " + this.length);
        }


    }

    class Seed
    {
        public long value;
        public long location;
        public List<Map> maps;

        public Seed(long value, List<Map> maps)
        {
            this.value = value;
            this.maps = maps;
            this.location = calculateLocation();
        }

        private long calculateLocation()
        {
            long value = this.value;
            foreach (Map map in this.maps)
            {
                value = map.GetDestination(value);
            }

            return value;
        }
    }
    class Part1
    {
        static void Main(string[] args)
        {
            string contents = File.ReadAllText(@"input.txt");

            string regexPattern = @"\n[\s\S]\n";
            Regex regex = new Regex(regexPattern);
            string[] matches = regex.Split(contents);

            List<Map> maps = new List<Map>();

            for (long i = 1; i < matches.Length; i++)
            {
                string[] mapStrings = matches[i].Split(':')[1].Split('\n');
                List<Range> ranges = new List<Range>();

                for (long j = 1; j < mapStrings.Length; j++)
                {
                    string rangeString = mapStrings[j];
                    long[] rangeNumbers = rangeString.Split(' ').Select(number => Convert.ToInt64(number)).ToArray();
                    Range range = new Range(rangeNumbers);
                    ranges.Add(range);
                }

                Map map = new Map(ranges);

                maps.Add(map);
            }


            string seedRegexPattern = @": ";
            Regex seedRegex = new Regex(seedRegexPattern);

            long[] seedNumbers = seedRegex.Split(matches[0])[1].Split(' ').Select(number => Convert.ToInt64(number)).ToArray();
            List<Seed> seeds = new List<Seed>();

            foreach (long seedNumber in seedNumbers)
            {
                seeds.Add(new Seed(seedNumber, maps));
            }


            Console.WriteLine(seeds.Select(seed => seed.location).Min());

        }
    }
}