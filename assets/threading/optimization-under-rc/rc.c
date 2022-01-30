#define _GNU_SOURCE
#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>

#define ROUNDS 10

struct ctx_t {
    int *data;
    int n;
};

void* loop(void *p) {
    struct ctx_t *ctx = p;
    int *data = ctx->data;
    int n = ctx->n;

    for (int j = 0; j < ROUNDS; ++j) {
        for (int i = 0; i < DATASZ; ++i) {
            while(data[i] % 2 == n);
            ++data[i];
        }
    }

    return NULL;
}

int main(int argc, char *argv[]) {
    if (argc != 3)
        return -1;

    int *data = calloc(DATASZ, sizeof(int));

    pthread_t ths[2];
    struct ctx_t ctxs[] = {{data, 0}, {data, 1}};

    cpu_set_t cpuset;
    pthread_attr_t attr;
    pthread_attr_init(&attr);

    for (int i = 0; i < 2; ++i) {
        CPU_ZERO(&cpuset);
        CPU_SET(atoi(argv[i+1]), &cpuset);
        pthread_attr_setaffinity_np(&attr, sizeof(cpu_set_t), &cpuset);
        pthread_create(&ths[i], &attr, loop, &ctxs[i]);
    }

    pthread_join(ths[0], NULL);
    pthread_join(ths[1], NULL);

    int sum = 0;
    for (int i = 0; i < DATASZ; ++i)
        sum += data[i];

    free(data);
    printf("Sum %d\n", sum);

    return 0;
}
